import React from 'react'

interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
  }
  
  const InputFields: React.FC<InputFieldProps> = ({ label, value, onChange, type}) => {
    return (
      <div>
        <label className="font-medium">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
        />
      </div>
    );
  };

  export default InputFields;