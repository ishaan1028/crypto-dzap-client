import "./App.scss";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://crypto-dzap-server.vercel.app";
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
