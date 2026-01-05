import React from "react";

interface UploadCardProps {
  onFile: (file: File) => void;
  label?: string;
}

const UploadCard: React.FC<UploadCardProps> = ({ onFile, label }) => {
  return (
    <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-gray-100 transition">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />

      <div className="text-gray-700 font-medium">
        {label || "Upload Image"}
      </div>

      <div className="text-sm text-gray-400 mt-2">
        Drag & drop or click to upload
      </div>
    </label>
  );
};

export default UploadCard;
