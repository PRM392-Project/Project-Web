import { Box } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/admin/AdminHeader";
import AdminProfileComponent from "../../components/admin/AdminProfileComponent";
import Sidebar from "../../components/admin/AdminSidebar";

export default function AdminProfile() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#f5f5f5",
            p: 2,
            overflowY: "auto",
          }}>
          <AdminProfileComponent />
        </Box>
      </Box>
    </Box>
  );
}
