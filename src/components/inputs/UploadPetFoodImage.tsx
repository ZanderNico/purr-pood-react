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
          <label>{label}</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
      );
}

export default UploadPetFoodImage