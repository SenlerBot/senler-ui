import { spawn, spawnSync } from "node:child_process";
import { constants as osConstants } from "node:os";

const FORCE_KILL_DELAY_MS = 2_000;
const FORWARDED_SIGNALS = ["SIGHUP", "SIGINT", "SIGTERM"];

const terminateProcessTree = (child, signal) => {
  if (!child.pid) return;
  try {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore",
      });
    } else {
      process.kill(-child.pid, signal);
    }
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
};

const signalExitCode = (signal) =>
  128 + (osConstants.signals[signal] ?? 0);

export async function runSupervisedProcess(
  command,
  arguments_,
  {
    cwd,
    env = process.env,
    stdio = "inherit",
    timeoutMs,
  } = {},
) {
  const child = spawn(command, arguments_, {
    cwd,
    env,
    stdio,
    detached: process.platform !== "win32",
  });
  let stopReason = null;
  let forceKillTimeout;
  let timeout;

  const requestStop = (reason, signal) => {
    if (stopReason) {
      terminateProcessTree(child, "SIGKILL");
      return;
    }
    stopReason = reason;
    terminateProcessTree(child, signal);
    forceKillTimeout = setTimeout(
      () => terminateProcessTree(child, "SIGKILL"),
      FORCE_KILL_DELAY_MS,
    );
  };
  const signalHandlers = new Map(
    FORWARDED_SIGNALS.map((signal) => [
      signal,
      () => requestStop(signal, signal),
    ]),
  );
  signalHandlers.forEach((handler, signal) => process.on(signal, handler));
  if (timeoutMs !== undefined) {
    timeout = setTimeout(() => requestStop("timeout", "SIGTERM"), timeoutMs);
  }

  const result = await new Promise((resolveResult) => {
    child.once("error", (error) =>
      resolveResult({ error, status: null, signal: null }),
    );
    child.once("close", (status, signal) =>
      resolveResult({ error: null, status, signal }),
    );
  });

  if (timeout) clearTimeout(timeout);
  if (forceKillTimeout) clearTimeout(forceKillTimeout);
  signalHandlers.forEach((handler, signal) =>
    process.removeListener(signal, handler),
  );

  const receivedSignal =
    stopReason && stopReason !== "timeout" ? stopReason : null;
  const exitCode = receivedSignal
    ? signalExitCode(receivedSignal)
    : result.status ?? (result.signal ? signalExitCode(result.signal) : 1);
  return {
    ...result,
    exitCode,
    receivedSignal,
    timedOut: stopReason === "timeout",
  };
}
