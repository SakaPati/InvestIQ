import { Login } from "./components/authorization/login/Login"
import { Report } from "./components/Report/Report"
import Summary from './components/Summary/SummarySection';
function App() {

  return (
    <>
      <Login />
      <Report />
      <Summary transactions={[]} activeTab="expenses" />
    </>
  )
}

export default App