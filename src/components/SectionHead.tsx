interface SectionHeadProps {
  index: string;
  label: string;
  title: string;
  sub?: string;
}

export function SectionHead({ index, label, title, sub }: SectionHeadProps) {
  return (
    <div className="pf-sec-head reveal">
      <span className="pf-ghost-index">{index}</span>
      <div className="pf-register">
        <span className="pf-reg-index">§ {index}</span>
        <span className="pf-reg-rule" />
        <span className="pf-reg-label">{label}</span>
        <span className="pf-reg-fig">FIG.{index}</span>
      </div>
      <h2 className="pf-section-title">{title}</h2>
      {sub && <p className="pf-section-sub">{sub}</p>}
    </div>
  );
}
