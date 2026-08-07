import { Route, Routes } from "react-router-dom";
import { Report } from "./components/Report/Report";
import { Login } from "./components/authorization/login/Login";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}

export default App;
