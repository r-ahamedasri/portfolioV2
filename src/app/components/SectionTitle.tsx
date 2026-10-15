// Two-word section heading: first word in the text colour, second word highlighted in yellow.
export function SectionTitle({ a, b, r = true }: { a: string; b: string; r?: boolean }) {
  return <h2 className={`title${r ? " reveal" : ""}`}>{a} <span className="g">{b}</span></h2>;
}
