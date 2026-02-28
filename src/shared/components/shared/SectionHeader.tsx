import { cn } from "@/shared/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

function SectionHeader({
  title,
  description,
  align = "center",
  titleClassName,
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2
        className={cn(
          "text-2xl md:text-3xl lg:text-[42px] tracking-tight text-primary-dark",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-sm md:text-base lg:text-lg leading-relaxed text-secondary",
            align === "center" && "mx-auto max-w-2xl",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
