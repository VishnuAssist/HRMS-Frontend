import {
  
  Button,
  
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import { useDispatch, useSelector } from 'react-redux';
import type{ EmployeeType } from '../../models/EmployeeType';
import PreviewEmployee from './PreviewEmployee';
import { removeEmployee, setSearchTerm, setCurrentPage, setItemsPerPage } from '../../store/slices/EmployeeSlice';

import { AnimatePresence, motion } from "framer-motion";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employeeList, searchTerm, roleFilter, currentPage, itemsPerPage } = useSelector((state: any) => state.employee);

  // Filter farmers based on search term and role filter
  const filteredEmployee = employeeList.filter((employee: EmployeeType) => {
    const matchesSearch = employee.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination calculations
  const totalItems = filteredEmployee.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployee = filteredEmployee.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage + 1)); // Material-UI uses 0-based index, we use 1-based
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setItemsPerPage(parseInt(event.target.value, 10)));
  };

  // this is the form to input the value of user
  const [form, setForm] = useState(false);
  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  // this is the edit function
  const [update, setUpdate] = useState(false);
  const [datatoedit, setDataToEdit] = useState<EmployeeType | null>(null);
  const openUpdate = (data: EmployeeType) => {
    setDataToEdit(data);
    setUpdate(true);
  };
  const closeUpadate = () => {
    setUpdate(false);
  };

  // this is the preview function
  const [preview, setPreview] = useState(false);
  const [previewdata, setPreviewData] = useState<EmployeeType | null>(null);
  const openPreview = (data: EmployeeType) => {
    setPreview(true);
    setPreviewData(data);
  };
  const closePreview = () => {
    setPreview(false);
  };

  // this is the delete function
  const [alertdeleteStore, setAlertDeleteStore] = useState(false);
  const [userToDelete, setUserToDelete] = useState<EmployeeType | null>(null);

  const deleteStore = () => {
    if (userToDelete) {
      dispatch(removeEmployee({ id: userToDelete.id }));
      setAlertDeleteStore(false);
      setUserToDelete(null);
    }
  };
  const openDelete = (user: EmployeeType) => {
    setAlertDeleteStore(true);
    setUserToDelete(user);
  };
  const closeDelete = () => {
    setAlertDeleteStore(false);
    setUserToDelete(null);
  };

  return (
    <>

        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Showing {paginatedEmployee.length} of {totalItems} farmers
          </Typography>
        </Box> */}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell >Email</TableCell>
    
              <TableCell >role</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {paginatedEmployee.length > 0 ? (
                paginatedEmployee.map((employeeDetails: EmployeeType) => (
                  <TableRow
                    key={employeeDetails.id}
                    component={motion.tr}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell>{employeeDetails.firstName}</TableCell>
                    <TableCell>{employeeDetails.email}</TableCell>
                
                    <TableCell>{employeeDetails.role}</TableCell>
                    <TableCell>
                      {/* <IconButton
                        size="small"
                        color="primary"
                        aria-label="View"
                        onClick={() => openPreview(employeeDetails)}
                      >
                        <VisibilityIcon />
                      </IconButton> */}
                      <IconButton
                        size="small"
                        color="warning"
                        aria-label="edit"
                        onClick={() => openUpdate(employeeDetails)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => openDelete(employeeDetails)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                      No employees found matching your criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={itemsPerPage}
          page={currentPage - 1} // Convert to 0-based for Material-UI
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      

      <Dialog
        open={alertdeleteStore}
        onClose={closeDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          Are you sure you want to delete this employee?
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDelete}>
            Cancel
          </Button>
          <Button color="error" onClick={deleteStore}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      <EmployeeForm form={form} closeForm={closeForm} initialEmployee={null} />
      <PreviewEmployee
        preview={preview}
        closePreview={closePreview}
        PreviewDetails={previewdata}
      />
      <EmployeeForm
        form={update}
        closeForm={closeUpadate}
        initialEmployee={datatoedit}
      />
    </>
  );
};

export default EmployeeTable;