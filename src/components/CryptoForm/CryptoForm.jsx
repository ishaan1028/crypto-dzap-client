import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./CryptoForm.scss";

const CryptoForm = ({ submitCallback, currencyData }) => {
  const initCrypto = "";
  const initAmount = "";
  const initFiat = "USD";

  const [crypto, setCrypto] = useState(initCrypto);
  const [amount, setAmount] = useState(initAmount);
  const [fiat, setFiat] = useState(initFiat);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "crypto":
        setCrypto(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "fiat":
        setFiat(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setCrypto(initCrypto);
    setAmount(initAmount);
    setFiat(initFiat);
  };

  const validateInputs = () => {
    if (!crypto || !amount || !fiat) {
      alert("All fields are required.");
      return false;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Amount must be a number greater than 0.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    submitCallback({ crypto, amount, fiat });
    resetForm();
  };

  return (
    currencyData && (
      <div className="crypto-form">
        <h3 className="title">Crypto Form</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Crypto</Form.Label>
            <Form.Select name="crypto" value={crypto} onChange={handleChange}>
              <option disabled value={""}>
                Select source cryptocurrency
              </option>
              {currencyData?.crypto_list?.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.symbol}>
                    {`${crypto.name} (${crypto.symbol})`}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target currency</Form.Label>
            <Form.Select name="fiat" value={fiat} onChange={handleChange}>
              {currencyData?.fiat_list?.map((fiat) => {
                return (
                  <option key={fiat.id} value={fiat.symbol}>
                    {`${fiat.name} (${fiat.symbol})`}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="crypto-submit-btn">
            Submit
          </Button>
        </Form>
      </div>
    )
  );
};

CryptoForm.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  currencyData: PropTypes.object.isRequired,
};

export default CryptoForm;
