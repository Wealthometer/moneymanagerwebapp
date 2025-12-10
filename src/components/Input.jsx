import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  isSelect,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleshowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>

      <div className="relative">
        {isSelect ? (
          <select
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-5 focus::outline-none focus:border-blue-500"
            value={value}
            onChange={(e) => onChange(e)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="w-full bg-transparent outline-none border border-gray-300 rounded py-2 px-3 pr-10 text-gray-700 text-sm leading-tight focus:border-blue-500"
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
          />
        )}

        {type === "password" && (
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleshowPassword}
          >
            {showPassword ? (
              <Eye
                className="text-primary"
                size={20}
                onClick={toggleshowPassword}
              />
            ) : (
              <EyeClosed
                className="text-slate-400"
                size={20}
                onClick={toggleshowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
