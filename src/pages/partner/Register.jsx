import React from "react";
import RegisterForm from "../../components/partner/RegisterForm";
import { registerDesignerAPI } from "../../services/UsersSevices";

export default function Register() {
  const handleRegister = async (formData) => {
    try {
      const result = await registerDesignerAPI(
        formData.name,
        formData.email,
        formData.password,
        formData.applicattionUrl
      );
      console.log("Đăng ký thành công:", result);
      alert("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
}
