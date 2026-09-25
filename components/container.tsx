import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({
  children,
  className,
  wrapperClassName,
  ...props
}: ContainerProps) {
  return (
    <section className={cn("area-z-section relative isolate w-full overflow-hidden px-4 py-16 sm:px-8 md:py-24", wrapperClassName)}>
      <div className={cn("relative z-10 mx-auto max-w-7xl", className)} {...props}>
        {children}
      </div>
    </section>
  );
}
