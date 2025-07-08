import { useState } from "react";

export default function Dropdown({
  currencies,
  disabled,
  currencySymbol,
  onSetSymbol,
  direction = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown ${direction}`}>
      <div
        className="selected-currency"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <p>{currencies[currencySymbol]}</p>
        <span className="caret">
          {isOpen ? (
            <i className="fa-solid fa-caret-up"></i>
          ) : (
            <i className="fa-solid fa-caret-down"></i>
          )}
        </span>
      </div>
      {isOpen ? (
        <ul className="currencies">
          {Object.keys(currencies).map((currency) => (
            <li
              className={`currency ${disabled === currency ? "disabled" : ""}`}
              key={currency}
              onClick={() => {
                if (disabled === currency) return;

                onSetSymbol(currency);
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              {currencies[currency]}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
