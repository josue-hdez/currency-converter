export function Section({ className = "", label, children }) {
  return (
    <section className={`section ${className}`}>
      <label className="label">{label}</label>
      {children}
    </section>
  );
}
