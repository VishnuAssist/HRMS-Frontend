import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  Chip,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Close,
  Person,
  Email,
  Phone,
  Cake,
  LocationOn,
  Work,
  CalendarToday,
  Badge,
  Agriculture,
} from '@mui/icons-material';
import { FC } from 'react';
import type { EmployeeType, RoleType } from '../../models/EmployeeType';
import { motion, AnimatePresence } from 'framer-motion';

// Extended interface to include farmEquipmentOwned

interface Props {
  preview: boolean;
  closePreview: () => void;
  PreviewDetails: EmployeeType | null;
}

// Animation variants
const dialogVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      duration: 0.5
    }
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const PreviewEmployee: FC<Props> = ({
  preview,
  closePreview,
  PreviewDetails
}) => {
  if (!PreviewDetails) return null;

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'F';
  };

  const getRoleColor = (role: RoleType) => {
    return role === 'farmer' ? 'success' : 'primary';
  };

  const DetailItem: FC<{
    icon: React.ReactNode;
    label: string;
    value?: string | number;
  }> = ({ icon, label, value }) => (
    <motion.div variants={itemVariants}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 1 }}>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box sx={{ color: 'primary.main' }}>{icon}</Box>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="medium"
          >
            {label}
          </Typography>
        </Grid>
        <Grid size={{ xs: 7 }}>
          <Typography variant="body1" fontWeight="medium">
            {value || 'Not provided'}
          </Typography>
        </Grid>
      </Grid>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {preview && (
        <Dialog
          open={preview}
          onClose={closePreview}
          maxWidth="md"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={
            {
              variants: dialogVariants,
              initial: 'hidden',
              animate: 'visible',
              exit: 'exit'
            } as any
          }
          sx={{
            '& .MuiDialog-container': {
              backdropFilter: 'blur(4px)'
            }
          }}
        >
          <motion.div
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #115293 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Person />
                  </motion.div>
                  <Typography variant="h6" fontWeight="bold">
                    Employee Details
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={closePreview}
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <Close />
                </IconButton>
              </motion.div>

              {/* Animated background elements */}
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 20, repeat: Infinity, ease: 'linear' }
                }}
                style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%'
                }}
              />
            </DialogTitle>

            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
              {/* Header Section */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Box
                  sx={{
                    background:
                      'linear-gradient(135deg, #f5f5f5 0%, #e8f5fe 100%)',
                    p: 3,
                    borderBottom: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <Grid container spacing={3} alignItems="center">
                    <Grid>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            border: '4px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        >
                          {getInitials(
                            PreviewDetails.firstName,
                            PreviewDetails.lastName
                          )}
                        </Avatar>
                      </motion.div>
                    </Grid>
                    <Grid>
                      <motion.div
                        variants={staggerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 1
                          }}
                        >
                          <motion.div variants={itemVariants}>
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              color="primary.dark"
                            >
                              {PreviewDetails.firstName}{' '}
                              {PreviewDetails.lastName}
                            </Typography>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            variants={itemVariants}
                          >
                            <Chip
                              label={PreviewDetails.role}
                              color={getRoleColor(PreviewDetails.role)}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </motion.div>
                        </Box>
                        <motion.div variants={itemVariants}>
                          <Typography variant="body1" color="text.secondary">
                            @{PreviewDetails.userName}
                          </Typography>
                        </motion.div>
                        {PreviewDetails.email && (
                          <motion.div variants={itemVariants}>
                            <Typography
                              variant="body2"
                              color="primary.main"
                              sx={{ mt: 0.5 }}
                            >
                              {PreviewDetails.email}
                            </Typography>
                          </motion.div>
                        )}
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>

              {/* Details Section */}
              <motion.div
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Personal Information */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div variants={itemVariants}>
                        <motion.div
                          variants={cardHoverVariants}
                          initial="rest"
                          whileHover="hover"
                        >
                          <Card
                            variant="outlined"
                            sx={{
                              height: '100%',
                              border: '2px solid',
                              borderColor: 'grey.100',
                              borderRadius: 2,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                          >
                            <CardContent>
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 2
                                  }}
                                >
                                  <Badge sx={{ color: 'primary.main' }} />
                                  <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="primary.dark"
                                  >
                                    Personal Information
                                  </Typography>
                                </Box>
                              </motion.div>

                              <DetailItem
                                icon={<Cake fontSize="small" />}
                                label="Date of Birth"
                                value={PreviewDetails.dob}
                              />

                              <DetailItem
                                icon={<Person fontSize="small" />}
                                label="Age"
                                value={PreviewDetails.age}
                              />

                              <DetailItem
                                icon={<Email fontSize="small" />}
                                label="Email"
                                value={PreviewDetails.email}
                              />

                              <DetailItem
                                icon={<Phone fontSize="small" />}
                                label="Phone"
                                value={PreviewDetails.phoneNumber}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </Grid>

                    {/* Address Information */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div variants={itemVariants}>
                        <motion.div
                          variants={cardHoverVariants}
                          initial="rest"
                          whileHover="hover"
                        >
                          <Card
                            variant="outlined"
                            sx={{
                              height: '100%',
                              border: '2px solid',
                              borderColor: 'grey.100',
                              borderRadius: 2,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                          >
                            <CardContent>
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 2
                                  }}
                                >
                                  <LocationOn sx={{ color: 'primary.main' }} />
                                  <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="primary.dark"
                                  >
                                    Address Details
                                  </Typography>
                                </Box>
                              </motion.div>

                              <DetailItem
                                icon={<LocationOn fontSize="small" />}
                                label="Village"
                                value={PreviewDetails.village}
                              />

                              <DetailItem
                                icon={<LocationOn fontSize="small" />}
                                label="Taluk"
                                value={PreviewDetails.taluk}
                              />

                              <DetailItem
                                icon={<LocationOn fontSize="small" />}
                                label="District"
                                value={PreviewDetails.district}
                              />

                              <DetailItem
                                icon={<LocationOn fontSize="small" />}
                                label="Pincode"
                                value={PreviewDetails.pincode}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </Grid>

                    {/* Farm Equipment Section */}

                    {PreviewDetails.farmEquipmentOwned &&
                      PreviewDetails.farmEquipmentOwned.length > 0 && (
                        <Grid size={{ xs: 12, md: 12 }}>
                          <motion.div variants={itemVariants}>
                            <motion.div
                              variants={cardHoverVariants}
                              initial="rest"
                              whileHover="hover"
                            >
                              <Card
                                variant="outlined"
                                sx={{
                                  border: '2px solid',
                                  borderColor: 'success.light',
                                  borderRadius: 2,
                                  background:
                                    'linear-gradient(135deg, #f8fff8 0%, #f0fff0 100%)'
                                }}
                              >
                                <CardContent>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                      mb: 2
                                    }}
                                  >
                                    <Agriculture
                                      sx={{ color: 'success.main' }}
                                    />
                                    <Typography
                                      variant="h6"
                                      fontWeight="bold"
                                      color="success.dark"
                                    >
                                      Farm Equipment Owned
                                    </Typography>
                                  </Box>
                                  <Typography>
                                    {PreviewDetails.farmEquipmentOwned}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </motion.div>
                        </Grid>
                      )}

                    {/* Professional Information */}
                    {PreviewDetails.role === 'farmer' && (
                      <Grid size={{ xs: 12, md: 12 }}>
                        <motion.div variants={itemVariants}>
                          <motion.div
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                          >
                            <Card
                              variant="outlined"
                              sx={{
                                border: '2px solid',
                                borderColor: 'warning.light',
                                borderRadius: 2,
                                background:
                                  'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)'
                              }}
                            >
                              <CardContent>
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 300
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                      mb: 2
                                    }}
                                  >
                                    <Work sx={{ color: 'warning.main' }} />
                                    <Typography
                                      variant="h6"
                                      fontWeight="bold"
                                      color="warning.dark"
                                    >
                                      Professional Details
                                    </Typography>
                                  </Box>
                                </motion.div>

                                <Grid container spacing={4}>
                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem
                                      icon={<Work fontSize="small" />}
                                      label="Experience"
                                      value={
                                        PreviewDetails.experienceYears
                                          ? `${PreviewDetails.experienceYears} years`
                                          : 'Not provided'
                                      }
                                    />
                                  </Grid>
                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem
                                      icon={<CalendarToday fontSize="small" />}
                                      label="Member Since"
                                      value={PreviewDetails.dob}
                                    />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </motion.div>
                      </Grid>
                    )}
                  </Grid>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        ID: {PreviewDetails.id} • Last updated:{' '}
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PreviewEmployee;
