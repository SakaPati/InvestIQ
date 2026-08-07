import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Report } from "./components/Report/Report";
// import { Login } from "./components/authorization/login/Login";
// import Transactions from "./components/transactions/Transactions";
import Header from "./components/Header/Header";
// import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { NotFound } from "./components/NotFound/NotFound";
// import { Login } from "./components/authorization/login/Login";
import Summary from "./components/Summary/SummarySection";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Header />
    <Routes>
        <Route path="/stats" element={<Summary />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;