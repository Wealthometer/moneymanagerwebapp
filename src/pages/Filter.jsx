import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
  useUser();
  return (
    <Dashboard activeMenu="Filters">
      <div className=""> Filter Page </div>
    </Dashboard>
  );
};

export default Filter;
