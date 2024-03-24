import React from 'react'

interface FileInputProps {
    label: string;
    onChange: (file: File) => void;
  }

const UploadPetFoodImage: React.FC<FileInputProps> = ({ label, onChange }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          onChange(selectedFile);
        }
      };
    
      return (
        <div>
          <label className="font-medium">{label}</label>
          <input type="file" onChange={handleFileChange} accept="image/*" 
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 focus:outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
          />
        </div>
      );
}

export default UploadPetFoodImage