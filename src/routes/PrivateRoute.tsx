import { useAuth } from "@contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(){
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}