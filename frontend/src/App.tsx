import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Report } from "./components/Report/Report";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { NotFound } from "./components/NotFound/NotFound";
import { Login } from "./components/authorization/login/Login";
import Summary from "./components/Summary/SummarySection";

function App() {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
{/* 
      <Route element={<PrivateRoute />}> */}
        <Route path="/stats" element={<Summary />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
      {/* </Route> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;