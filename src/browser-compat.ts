import {
  ByteLengthQueuingStrategy as PonyfillByteLengthQueuingStrategy,
  CountQueuingStrategy as PonyfillCountQueuingStrategy,
  ReadableStream as PonyfillReadableStream,
  TransformStream as PonyfillTransformStream,
  WritableStream as PonyfillWritableStream,
} from 'web-streams-polyfill'

export {
  SENLER_BROWSER_COMPATIBILITY_BROWSERS,
  SENLER_JS_COMPATIBILITY_TARGET,
} from './browser-support'

const defineMissingGlobal = (name: string, value: object) => {
  if (Reflect.has(globalThis, name)) {
    return
  }

  Reflect.defineProperty(globalThis, name, {
    value,
    configurable: true,
    writable: true,
  })
}

interface CompatibleTransformer {
  start?: (controller: ReadableStreamDefaultController<unknown>) => void | PromiseLike<void>
  transform?: (
    chunk: unknown,
    controller: ReadableStreamDefaultController<unknown>,
  ) => void | PromiseLike<void>
  flush?: (controller: ReadableStreamDefaultController<unknown>) => void | PromiseLike<void>
}

const getReadableController = (
  controller: ReadableStreamDefaultController<unknown> | null,
) => {
  if (!controller) {
    throw new Error('TransformStream controller is not ready')
  }

  return controller
}

class CompatibleTransformStream {
  readonly readable: ReadableStream<unknown>
  readonly writable: WritableStream<unknown>

  constructor(transformer: CompatibleTransformer = {}) {
    let readableController: ReadableStreamDefaultController<unknown> | null = null
    let writeQueue = Promise.resolve()

    this.readable = new ReadableStream<unknown>({
      start(controller) {
        readableController = controller

        if (transformer.start) {
          return transformer.start(controller)
        }
      },
    })

    this.writable = new WritableStream<unknown>({
      write(chunk) {
        writeQueue = writeQueue.then(() => {
          const controller = getReadableController(readableController)

          if (transformer.transform) {
            return transformer.transform(chunk, controller)
          }

          controller.enqueue(chunk)
        })

        return writeQueue
      },
      close() {
        return writeQueue.then(() => {
          const controller = getReadableController(readableController)

          if (transformer.flush) {
            return Promise.resolve(transformer.flush(controller)).then(() => {
              controller.close()
            })
          }

          controller.close()
        })
      },
      abort(reason) {
        getReadableController(readableController).error(reason)
      },
    })
  }
}

class CompatibleTextEncoderStream {
  readonly encoding = 'utf-8'
  readonly readable: ReadableStream<Uint8Array>
  readonly writable: WritableStream<string>

  constructor() {
    const encoder = new TextEncoder()
    const transform = new TransformStream<string, Uint8Array>({
      transform(chunk, controller) {
        controller.enqueue(encoder.encode(String(chunk)))
      },
    })

    this.readable = transform.readable
    this.writable = transform.writable
  }
}

class CompatibleTextDecoderStream {
  readonly encoding: string
  readonly fatal: boolean
  readonly ignoreBOM: boolean
  readonly readable: ReadableStream<string>
  readonly writable: WritableStream<BufferSource>

  constructor(label?: string, options?: TextDecoderOptions) {
    const decoder = new TextDecoder(label, options)
    const transform = new TransformStream<BufferSource, string>({
      transform(chunk, controller) {
        controller.enqueue(decoder.decode(chunk, { stream: true }))
      },
      flush(controller) {
        const tail = decoder.decode()

        if (tail) {
          controller.enqueue(tail)
        }
      },
    })

    this.encoding = decoder.encoding
    this.fatal = decoder.fatal
    this.ignoreBOM = decoder.ignoreBOM
    this.readable = transform.readable
    this.writable = transform.writable
  }
}

export const installBrowserCompatibilityPolyfills = () => {
  defineMissingGlobal('ReadableStream', PonyfillReadableStream)
  defineMissingGlobal('WritableStream', PonyfillWritableStream)
  defineMissingGlobal('ByteLengthQueuingStrategy', PonyfillByteLengthQueuingStrategy)
  defineMissingGlobal('CountQueuingStrategy', PonyfillCountQueuingStrategy)

  const hasNativeReadableAndWritable = (
    Reflect.has(globalThis, 'ReadableStream') && Reflect.has(globalThis, 'WritableStream')
  )

  defineMissingGlobal(
    'TransformStream',
    hasNativeReadableAndWritable ? CompatibleTransformStream : PonyfillTransformStream,
  )

  if (Reflect.has(globalThis, 'TextEncoder')) {
    defineMissingGlobal('TextEncoderStream', CompatibleTextEncoderStream)
  }

  if (Reflect.has(globalThis, 'TextDecoder')) {
    defineMissingGlobal('TextDecoderStream', CompatibleTextDecoderStream)
  }
}

installBrowserCompatibilityPolyfills()
