import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser"

const Expense = () => {
  useUser();
  return( 
  <Dashboard activeMenu="Expense">
      <div className=""> Expense Page </div>
    </Dashboard>
  )
}

export default Expense