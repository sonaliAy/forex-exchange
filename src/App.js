import logo from "./logo.svg";
import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("USD");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    // axios
    //   .get(
    //     "http://data.fixer.io/api/latest?access_key=bfb77bb1ad0207299325a3bdb12689a5"
    //   )
    //   .then((response) => {
    //     setRates(response.data.rates);
    //   });
  }, []);

  useEffect(() => {
    if (!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount2(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div className="app">
      <h1>Forex Exchange</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
      <div className="compare-main">
        <div className="compare-second">
          <div className="compare-text">Comparison:</div>
          <div>
            <h1 className="heading">
              {amount1} {" "}
              {currency1}
            </h1>
            <h1 className="heading">
              {amount2} {currency2}{" "}
            </h1>
          </div>
        </div>
      </div>

      {/* <img src="https://drive.google.com/file/d/1PO1YPFpVQB98uLdXH7wdRWABjX7pPzvu/view?usp=sharing" alt="" /> */}
    </div>
  );
}

export default App;
