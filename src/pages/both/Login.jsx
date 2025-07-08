import React, { useState } from 'react';
import LoginForm from '../../components/both/LoginForm';
import { toast } from "react-toastify";
import { loginDesignerAPI } from '../../services/UsersSevices';
import { routes } from "../../routes";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginDesignerAPI(form.email, form.password);

    if (res && typeof res === 'string') {
      localStorage.setItem('token', res);
      const decoded = jwtDecode(res);
      const role = decoded.Role || decoded['Role'];

      
      if (role === 'Designer' || role === 1 || role === '1') {
        navigate(routes.partnerDashboard, { state: { toastMessage: 'Đăng nhập thành công!' } });
      } else if (role === 'Admin' || role === 0 || role === '0') {
        navigate(routes.adminDashboard, { state: { toastMessage: 'Đăng nhập thành công!' } });
      } else {
        toast.error('Quyền truy cập không hợp lệ!');
        navigate(routes.login);
      }
    } else {
      toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại!');
    }

  } catch (error) {
    console.error('Login error:', error);
    toast.error('Email hoặc mật khẩu không chính xác!');
  }
};


  return (
    <LoginForm
      values={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
