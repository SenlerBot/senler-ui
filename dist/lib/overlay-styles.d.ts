export declare const overlayLayerClassName = "z-[1100]";
export declare const overlaySolidSurfaceClassName = "overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md";
export declare const overlayGlassSurfaceClassName = "overflow-hidden rounded-lg border border-border/50 bg-popover/50 text-popover-foreground shadow-[0px_3px_12px_rgba(0,0,0,0.09)] backdrop-blur-[6px] backdrop-saturate-[190%] backdrop-contrast-[50%] backdrop-brightness-[130%]";
export declare const overlayStateAnimationClassName = "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95";
export declare const overlaySideAnimationClassName = "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
export declare const overlayMotionClassName = "duration-200 ease-out will-change-transform focus-visible:outline-none";
export type OverlaySurface = 'solid' | 'glass';
