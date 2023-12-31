import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CryptoForm from "../../components/CryptoForm/CryptoForm";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import ModalContainer from "../../components/ModalContainer/ModalContainer";
import { generateQueryString } from "../../utils";

const Home = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const url = "/api/crypto/list";
    const source = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsPending(true);
        const { data } = await axios.get(url, {
          cancelToken: source.token,
        });
        if (data.status && data.status != "success") throw new Error("Failed");
        setCurrencyData(data.data);
        setIsPending(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Error fetching data");
          setIsPending(false);
        }
      }
    };
    getData();

    //aborts requests when unmounting and in case of muliple requests
    return () => {
      source.cancel("component unmounted");
    };
  }, []);

  const handleModalClose = () => {
    setResult(null);
  };

  const handleConversion = async (paramsObject) => {
    const queryString = generateQueryString(paramsObject);
    const url = `/api/crypto/convert${queryString}`;
    try {
      setIsPending(true);
      const { data } = await axios.get(url);
      if (data.status && data.status != "success") throw new Error("Failed");
      setResult({
        ...paramsObject,
        result: data.data.conversion,
        unitPrice: data.data.unit_price,
      });
      setIsPending(false);
    } catch (err) {
      setError("Something went wrong");
      setIsPending(false);
    }
  };

  if (isPending) return <Loader />;

  if (error) return <h1 className="error-msg">{error}</h1>;

  return (
    <Container>
      {currencyData && (
        <CryptoForm
          submitCallback={handleConversion}
          currencyData={currencyData}
        />
      )}
      {result && (
        <ModalContainer
          show={result != null}
          heading="Conversion Result"
          close={handleModalClose}
        >
          <h4 className="mb-3">{`1 ${result.crypto} = ${result.unitPrice} ${result.fiat}`}</h4>
          <p>Therefore,</p>
          <h4 className="mb-5">{`${result.amount} ${result.crypto} = ${result.result} ${result.fiat} `}</h4>
          <Button className="w-100" onClick={handleModalClose}>
            Close
          </Button>
        </ModalContainer>
      )}
    </Container>
  );
};

export default Home;
