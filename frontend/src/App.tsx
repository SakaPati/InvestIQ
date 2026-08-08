import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Report } from "./components/Report/Report";
import Header from "./components/Header/Header";
import { NotFound } from "./components/NotFound/NotFound";
import Summary from "./components/Summary/SummarySection";
import { Login } from "./components/authorization/login/Login";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Summary />} />
          <Route path="/report" element={<Report />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
