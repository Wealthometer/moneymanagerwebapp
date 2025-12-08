import { useContext } from "react";
import { useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left Side - Menu Button and Title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-400 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Right side - Avatar Photo */}
      <span>Right Side Menu</span>

      {/* Mobile Side menu */}
      <span>Mobile side Menu</span>
    </div>
  );
};

export default Menubar;
