import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";

const Income = () => {
  useUser();
  return( 
  <Dashboard activeMenu="Income">
      <div className=""> Income Page </div>
    </Dashboard>
  )
}

export default Income