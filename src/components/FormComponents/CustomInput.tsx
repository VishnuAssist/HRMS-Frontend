import React from 'react';
import { Grid, TextField, InputLabel } from '@mui/material';

interface CustomInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'datetime-local' | 'password' | 'email';
  register?: any; // react-hook-form register
  required?: boolean;
  fullWidth?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  required = false,
  fullWidth = true
}) => {
  return (
    <>
      <InputLabel htmlFor={`input-${label}`} className="label-bold">
        {label} {required && <span className="required-asterisk">*</span>}
      </InputLabel>

      <TextField
        id={name}
        type={type}
        {...(register && register(name))}
        fullWidth={fullWidth}
        sx={{ maxWidth: 400, marginTop: 1 }}
      />
    </>
  );
};

export default CustomInput;
