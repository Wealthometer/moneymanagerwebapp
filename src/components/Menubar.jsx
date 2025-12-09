import { useContext } from "react";
import { useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleDropDown =() => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false)
    navigate("/login")
  }

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

        <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-10 w-10" />
            <span className="text-lg font-medium text-black truncate">
                Money 
                <span className="text-indigo-700">
                    {" Manager"}
                </span>
            </span>
        </div>
      </div>

      {/* Right side - Avatar Photo */}
      <div className="relative" ref={dropdownRef}>
        <button
         onClick={() => setShowDropdown(!showDropdown)}
         className="flex items-center justify-center w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors duratio-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
            <User className="text-purple-700" />
        </button>

        {/* Dropdown Menu */}
       {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-400 py-1 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-400">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            <User className="w-4 h-4 text-purple-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {user?.fullname || "Guest"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Drop Options */}
                <div className="py-1">
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-200">
                    <LogOut className="w-4 h-4 text-purple-800" />
                    <span>Logout</span>
                  </button>
                </div>
            </div>
        )}
      </div>

      {/* Mobile Side menu */}
      <span>Mobile side Menu</span>
    </div>
  );
};

export default Menubar;
