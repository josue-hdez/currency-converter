import { Button } from "./Button";

export function Header({ appearance, onSetAppearance }) {
  return (
    <header className="header">
      <h1 className="header-title">Currency Converter</h1>
      <Button onClick={onSetAppearance}>
        {appearance ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </Button>
    </header>
  );
}
