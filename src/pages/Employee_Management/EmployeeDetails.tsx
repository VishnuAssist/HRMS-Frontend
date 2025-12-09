import { Card, Divider } from '@mui/material';
import EmployeeTable from './EmployeeTable';
import EmployeeSearch from './EmployeeSearch';

const EmployeeDetails = () => {
  return (
    <Card>
      <EmployeeSearch />
      <Divider />
      <EmployeeTable />
    </Card>
  );
};

export default EmployeeDetails;
