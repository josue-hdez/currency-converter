export function Button({ className = "", onClick, children }) {
  return (
    <button className={`btn ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
