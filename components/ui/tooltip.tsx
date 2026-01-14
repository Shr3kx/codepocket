"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ asChild, children, ...props }: TooltipPrimitive.Trigger.Props & { asChild?: boolean }) {
  if (asChild && children) {
    // Clone the child element and merge tooltip props with existing props
    return (
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        render={(triggerProps) => {
          if (React.isValidElement(children)) {
            const childProps = (children as React.ReactElement).props;
            // Merge onClick handlers - call both the tooltip's and the child's
            const mergedProps = {
              ...childProps,
              ...triggerProps,
              onClick: (e: React.MouseEvent) => {
                // Call child's onClick first
                if (childProps.onClick) {
                  childProps.onClick(e);
                }
                // Then call tooltip's onClick if it exists
                if (triggerProps.onClick) {
                  triggerProps.onClick(e);
                }
              },
            };
            return React.cloneElement(children as React.ReactElement, mergedProps);
          }
          return <div {...triggerProps}>{children}</div>;
        }}
        {...props}
      />
    );
  }
  // Always wrap children in a span so TooltipTrigger renders as span instead of button
  // This prevents nested button issues when TooltipTrigger wraps a Button component
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      render={(triggerProps) => (
        <span {...triggerProps} className="inline-block">
          {children}
        </span>
      )}
      {...props}
    />
  );
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs **:data-[slot=kbd]:rounded-md bg-foreground text-background z-50 w-fit max-w-xs origin-(--transform-origin)",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
