// import { Login } from "./components/authorization/login/Login"
import { Route, Routes } from "react-router";
import { Report } from "./components/Report/Report";
import { Login } from "./components/authorization/login/Login";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Header />
    </>
  );
}

export default App;
