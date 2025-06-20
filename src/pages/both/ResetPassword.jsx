import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../../services/UsersSevices';
import { toast } from 'react-toastify';
import ResetPasswordForm from '../../components/both/ResetPasswordForm';
import { 
  Dialog, DialogContent, DialogActions, 
  Button, Box, Typography, 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { routes } from '../../routes';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleResetPassword = async (newPassword) => {
    try {
      await resetPasswordAPI(token, newPassword);
      setOpenSuccessDialog(true);
    } catch (error) {
      toast.error('Đặt lại mật khẩu thất bại');
    }
  };

  const handleDialogClose = () => {
    setOpenSuccessDialog(false);
    navigate(routes.login);
  };

  return (
    <>
      <ResetPasswordForm onSubmit={handleResetPassword} />

      <Dialog
        open={openSuccessDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ bgcolor: '#3F5139', p: 2 }}>
          <Typography variant="h6" color="white" textAlign="center" fontWeight={600}>
            Đặt lại mật khẩu thành công
          </Typography>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CheckCircleIcon sx={{ fontSize: 60, color: '#3F5139', mb: 2 }} />
            <Typography variant="body1" color="textPrimary" textAlign="center">
              Mật khẩu của bạn đã được đặt lại thành công.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              bgcolor: '#3F5139',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: 2,
              ':hover': { bgcolor: '#33432e' },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
