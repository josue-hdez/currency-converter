import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Section } from "./Section";
import Dropdown from "./Dropdown";

export function Main() {
  const [currencies, setCurrencies] = useState({});
  const [fromSymbol, setFromSymbol] = useState("USD");
  const [toSymbol, setToSymbol] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(function () {
    async function fetchCurrencies() {
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v1/currencies"
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchCurrencies();
  }, []);

  useEffect(
    function () {
      async function fetchCurrencies() {
        try {
          const response = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${fromSymbol}&symbols=${toSymbol}`
          );

          if (!response.ok) throw new Error();

          const data = await response.json();
          setRate(data.rates[toSymbol]);
        } catch (error) {
          console.log(error.message);
        }
      }

      fetchCurrencies();
    },
    [fromSymbol, toSymbol]
  );

  return (
    <main className="main">
      <div className="container">
        <Section label={"From"}>
          <input
            className="input"
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
          <Dropdown
            currencies={currencies}
            currencySymbol={fromSymbol}
            disabled={toSymbol}
            onSetSymbol={(fromSymbol) => {
              setFromSymbol(fromSymbol);

              if (fromSymbol === toSymbol) {
                setToSymbol(fromSymbol);
              }
            }}
          />
        </Section>
        <Button
          className="shuffle-currency"
          onClick={() => {
            setFromSymbol(toSymbol);
            setToSymbol(fromSymbol);
          }}
        >
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
        </Button>
        <Section className="result" label={"To"}>
          <input
            className="input"
            type="number"
            id="result"
            name="result"
            disabled={true}
            value={(amount * rate).toFixed(2)}
          />
          <Dropdown
            currencies={currencies}
            disabled={fromSymbol}
            currencySymbol={toSymbol}
            onSetSymbol={setToSymbol}
            direction="up"
          />
        </Section>
      </div>
      <p className="currency-rate">
        1 {fromSymbol} = {rate} {toSymbol}
      </p>
    </main>
  );
}
