// import { Login } from "./components/authorization/login/Login"
import { Route, Routes } from "react-router-dom";
import { Report } from "./components/Report/Report";
// import { Login } from "./components/authorization/login/Login";
import Transactions from "./components/transactions/Transactions";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}

export default App;
