import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status == 200) {
        console.log("Income list", response.data);
        setIncomeData(response.data);
        toast.success("Incomes Fetched Succesfully");
      }
    } catch (error) {
      console.error("Failed to fetch income details:", error);
      toast.error(error.data.message || "Failed to fetch income details");
    } finally {
      setLoading(false);
      console.log("failed to load");
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories("Income Categories",response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income categories:", error);
      toast.error(
        error.data.message ||
          "Failed to fetch income categories for this category"
      );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line char */}
            <button className="add-btn flex items-center gap-1 bg-green-200/50 py-1 px-1 rounded-md font-semibold text-green-700">
              <Plus size={15} className="text-lg" /> Add Income
            </button>
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => console.log("...", id)}
          />

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            Income form modal
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
