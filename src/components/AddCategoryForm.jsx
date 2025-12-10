import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="add-btn add-btn-fill flex items-center justify-center bg-purple-700 text-white py-2 px-3 rounded-md gap-1"
      >
        {loading ? (
          <>
            <LoaderCircle className="w-4 h-4 animate-spin" />
            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>{isEditing ? "Update Category" : "Add Category"}</>
        )}
      </button>
    </div>
  );
};

export default AddCategoryForm;
