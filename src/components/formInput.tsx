import { TextField } from '@mui/material';
import { UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Inputs } from '../App';

interface FormInputProps {
  id: keyof Inputs;
  label: string;
  register: UseFormRegister<Inputs>;
  trigger: UseFormTrigger<Inputs>
  error: boolean;
  helperText: string;
}

export const FormInput: React.FC<FormInputProps> = ({ id, label, register, trigger, error, helperText }) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      autoComplete="off"
      {...register(id, { onChange: () => { 
        if (id == "email") trigger("phoneNumber")
        if (id == "phoneNumber") trigger("email")
      } })}
      error={error}
      helperText={helperText}
    />
  );
};

export default FormInput;
