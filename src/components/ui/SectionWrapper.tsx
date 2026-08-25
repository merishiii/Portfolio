import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  label?: string;
  heading: string;
  subheading?: string;
  className?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  label,
  heading,
  subheading,
  className,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20 lg:py-28 px-4 sm:px-6", className)}>
      <div className="max-w-6xl mx-auto w-full">
        {label && (
          <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">
            {label}
          </p>
        )}
        <h2 className="section-heading">{heading}</h2>
        {subheading && <p className="section-subheading">{subheading}</p>}
        <div className="mt-6 sm:mt-8">{children}</div>
      </div>
    </section>
  );
}
