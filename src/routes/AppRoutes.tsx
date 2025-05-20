import { Navigate, Route, Routes } from "react-router-dom";
import Assessment from "@pages/Assessment";
import Content from "@pages/Content";
import Exercise from "@pages/Exercise";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Layout from "@components/Layout";
import PrivateRoute from "@routes/PrivateRoute";
import { useAuth } from "@contexts/AuthContext";

export default function AppRoutes(){
    const { isAuthenticated } = useAuth();

    return(
        <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace/> : <Login/>}/>

            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to={"/home"} replace/>}/>

                    <Route path="/home" element={<Home/>}/>
                    <Route path="/conteudo" element={<Content/>}/>
                    <Route path="/exercicio" element={<Exercise/>}/>
                    <Route path="/avaliacao" element={<Assessment/>}/>

                    <Route path="*" element={<Navigate to={"/home"} replace/>}/>
                </Route>
            </Route>
            
            <Route path="*" element={<Navigate to={"/login"} replace/>}/>
        </Routes>
    )
}