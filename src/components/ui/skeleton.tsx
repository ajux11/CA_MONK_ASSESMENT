import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Width of the skeleton */
    width?: string | number
    /** Height of the skeleton */
    height?: string | number
    /** Shape variant */
    variant?: "default" | "circular" | "rounded"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, width, height, variant = "default", style, ...props }, ref) => {
        const variantClasses = {
            default: "rounded-md",
            circular: "rounded-full",
            rounded: "rounded-lg",
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "animate-pulse bg-muted",
                    variantClasses[variant],
                    className
                )}
                style={{
                    width: width,
                    height: height,
                    ...style,
                }}
                {...props}
            />
        )
    }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
