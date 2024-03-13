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
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };

  export default InputFields;