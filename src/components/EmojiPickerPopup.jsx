import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <Image />
          )}
        </div>
        <p>{icon ? "Change icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute top-0 right-0 z-50"
          >
            <X />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={handleEmojiClick}
            pickerStyle={{ zIndex: 40 }} // optional if picker hides button
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
