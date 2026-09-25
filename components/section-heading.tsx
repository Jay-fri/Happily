import { Markdown } from "./markdown";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="text-left">
      <h2 className="area-z-display text-4xl font-semibold leading-none sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-3 text-base opacity-80 md:text-lg">
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
