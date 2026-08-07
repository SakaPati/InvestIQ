import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Authorization/login/Login";
import { Home } from "./components/Home/Home";
import { Report } from "./components/Report/Report";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;