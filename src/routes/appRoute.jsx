import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "../ProtectedRoute";
import Login from "../pages/both/Login";
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminFurniture from "../pages/admin/AdminFurniture";
import AdminDesign from "../pages/admin/AdminDesign";
import Dashboard from "../pages/partner/Dashboard"
import Register from "../pages/partner/Register";
import Landing from "../pages/both/Landing"
import DesignTable from "../pages/partner/DesignTable"
import FurnitureTable from "../pages/partner/FurnitureTable";
import OrderTable from "../pages/partner/OrderTable";
import OrderDetails from "../pages/partner/OrderDetails";
import AdminOrder from "../pages/admin/AdminOrder";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import Profile from "../pages/partner/Profile";
import AdminProfile from "../pages/admin/AdminProfile";
import ForgotPassword from "../pages/both/ForgotPassword";
import AdminUser from "../pages/admin/AdminUser";
import ResetPassword from "../pages/both/ResetPassword";
import NewFurniture from "../pages/partner/NewFurniture";
import AdminWaiting from "../pages/admin/AdminWaiting";
import WaitingTable from "../pages/partner/WaitingTable";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function appRoute() {
    return (
        <div>

            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path={routes.landing} element={<Landing />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<Register />} />
                <Route path={routes.forgotPassword} element={<ForgotPassword />} />
                <Route path={routes.resetPassword} element={<ResetPassword />} />

                <Route path={routes.adminDashboard} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path={routes.adminFurniture} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminFurniture /></ProtectedRoute>} />
                <Route path={routes.adminDesign} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDesign /></ProtectedRoute>} />
                <Route path={routes.adminOrder} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminOrder /></ProtectedRoute>} />
                <Route path={routes.adminOrderDetail} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminOrderDetails /></ProtectedRoute>} />
                <Route path={routes.adminProfile} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminProfile /></ProtectedRoute>} />
                <Route path={routes.adminUser} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminUser /></ProtectedRoute>} />
                <Route path={routes.adminWaiting} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminWaiting /></ProtectedRoute>} />

                <Route path={routes.partnerDashboard} element={<ProtectedRoute allowedRoles={["Designer"]}><Dashboard /></ProtectedRoute>} />
                <Route path={routes.designList} element={<ProtectedRoute allowedRoles={["Designer"]}><DesignTable /></ProtectedRoute>} />
                <Route path={routes.furList} element={<ProtectedRoute allowedRoles={["Designer"]}><FurnitureTable /></ProtectedRoute>} />
                <Route path={routes.orderList} element={<ProtectedRoute allowedRoles={["Designer"]}><OrderTable /></ProtectedRoute>} />
                <Route path={routes.orderDetail} element={<ProtectedRoute allowedRoles={["Designer"]}><OrderDetails /></ProtectedRoute>} />
                <Route path={routes.profile} element={<ProtectedRoute allowedRoles={["Designer"]}><Profile /></ProtectedRoute>} />
                <Route path={routes.newFurniture} element={<ProtectedRoute allowedRoles={["Designer"]}><NewFurniture /></ProtectedRoute>} />
                <Route path={routes.waitList} element={<ProtectedRoute allowedRoles={["Designer"]}><WaitingTable /></ProtectedRoute>} />

            </Routes>

        </div>
    )
}

