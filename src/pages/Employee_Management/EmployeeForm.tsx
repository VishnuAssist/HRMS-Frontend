import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../../store/slices/EmployeeSlice';
import type{ EmployeeType } from '../../models/EmployeeType';
import CustomInput from '../../components/FormComponents/CustomInput';
import CustomSelect from '../../components/FormComponents/CustomSelect';

interface Props {
  form: boolean;
  closeForm: () => void;
  initialEmployee: EmployeeType | null;
}

const EmployeeForm: FC<Props> = ({ form, closeForm, initialEmployee }) => {
  const data: EmployeeType = {
    id: 0,

    age: 0,
    role: 'farmer',
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
  
  };

  const { register, handleSubmit, reset,  } = useForm({
    values: initialEmployee
  });
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

  const submitData = (data: any) => {
    data.isActive = isActive;
    console.log('statusss', data);
    if (initialEmployee) {
      dispatch(updateEmployee(data));
    } else {
      dispatch(addEmployee(data));
    }
    reset();
    closeForm();
  };



  useEffect(() => {
    reset(initialEmployee || data);
  }, [initialEmployee, reset]);

  console.log('edit deatils', initialEmployee);
  return (
    <>
      <Dialog open={form} onClose={closeForm} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: 'darkblue' }}>
          {initialEmployee ? 'Update Employee' : 'New Employee'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={handleSubmit(submitData)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="user Name"
                  name="userName"
                  register={register}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="Password"
                  name="password"
                  register={register}
                  required
                />
              </Grid>
              {!initialEmployee && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <CustomInput
                    label="Confirm Password "
                    name="confirmPassword"
                    register={register}
                    required
                  />
                </Grid>
              )}
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="First Name"
                  name="firstName"
                  register={register}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="last Name"
                  name="lastName"
                  register={register}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="Email"
                  name="email"
                  register={register}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="Date of Birth "
                  name="dob"
                  type="date"
                  register={register}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="Age"
                  name="age"
                  type="number"
                  register={register}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomInput
                  label="Phone Number"
                  name="phoneNumber"
                  register={register}
                  required
                />
              </Grid>
            
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomSelect
                  label="Role"
                  name="role"
                  options={[
                    { value: 'basic', label: 'Basic' },
                    { value: 'admin', label: 'Admin' },
                    
                  ]}
                  register={register}
                  defaultValue={initialEmployee?.role || 'admin'} // default value
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                {initialEmployee ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeForm;
