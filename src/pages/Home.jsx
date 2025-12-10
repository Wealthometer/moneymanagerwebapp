import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
  useUser();
  return (
    <div className="">
      <Dashboard activeMenu="Dashboard">
        ....
      </Dashboard>
    </div>
  );
};

export default Home;
