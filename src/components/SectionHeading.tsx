import Reveal from "./Reveal";

type Props = {
  id?: string;
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 font-mono text-sm text-accent">
        <span className="text-fg-dim">{index}.</span> ./{title.toLowerCase()}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
