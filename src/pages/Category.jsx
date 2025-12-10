import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Modal from "../components/Modal"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log('Categories', response.data)
        setCategoryData(response.data)
          toast.success('All existing Category Fetched Succesfully') 
      }
    } catch (error) {
      // handle error
      console.error("Something went wrong. Please Try again", error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [])

  const handleAddCategory = () => {
    console.log('Category added succesfully')
    const {name, type, icon} = category;

    
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add Button to add Categories */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button 
            onClick={() => setOpenAddCategoryModal(!openAddCategoryModal)}
            className="add-btn flex items-center gap-1 bg-green-200/50 py-1 px-1 rounded-md font-semibold text-green-700">
            <Plus size={15} />
            Add Category
          </button>
        </div>
      </div>

      {/* Category List */}
      <CategoryList categories={categoryData} />

      {/* Adding Category modal */}
      <Modal
        isOpen={openAddCategoryModal}
        onClose={() => setOpenAddCategoryModal(false)}
        title="+ Add Category +"
      >
        <AddCategoryForm onAddCategory={handleAddCategory} />
      </Modal>

      {/* Updating Category modal */}
    </Dashboard>
  );
};

export default Category;
