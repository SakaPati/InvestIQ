import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const PrivateRoute = () => {
    const { token, isLoggedIn } = useSelector((state: RootState) => state.user);
    const isAuthenticated = Boolean(token && isLoggedIn);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};