import React from 'react';
import ForgotPasswordForm from '../../components/both/ForgotPasswordForm'; 
import { toast } from 'react-toastify';
import { forgetPasswordAPI } from '../../services/UsersSevices';

export default function ForgotPassword() {
  const handleForgetPassword = async (email) => {
    try {
      const role = 1; 
      await forgetPasswordAPI(email, role);
      toast.success('Đã gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra email.');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại.'
      );
    }
  };

  return <ForgotPasswordForm onSubmit={handleForgetPassword} />;
}
