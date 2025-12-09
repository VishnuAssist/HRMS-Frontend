import React from "react";
import { Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

interface CustomSelectProps {
  label: string;
  name: string;
  options: { value: string | number; label: string }[];
  register?: any; // react-hook-form register
  required?: boolean;
  
  fullWidth?: boolean;
  defaultValue?: string | number; // added for default
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  fullWidth = true,
  defaultValue = "",
}) => {
  return (
    <>
       <InputLabel htmlFor={`input-${label}`} className="label-bold">
         {label} {required && <span className="required-asterisk">*</span>}
       </InputLabel>
      <FormControl fullWidth={fullWidth} sx={{ maxWidth: 400 }}>
       
        <Select
          labelId={`${name}-label`}
          id={name}
          defaultValue={defaultValue} // <-- default value here
          {...(register && register(name))}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomSelect;
