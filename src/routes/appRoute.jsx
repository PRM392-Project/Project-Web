import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

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
                
            </Routes>

        </div>
    )
}

