import { Navigate, Route, Routes } from "react-router-dom";
import Assessment from "@pages/Assessment";
import Content from "@pages/Content";
import Exercise from "@pages/Exercise";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Layout from "@components/Layout";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Navigate to={"/home"}/>}/>

            <Route path="/" element={<Layout/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/conteudo" element={<Content/>}/>
                <Route path="/exercicio" element={<Exercise/>}/>
                <Route path="/avaliacao" element={<Assessment/>}/>
            </Route>
            
            <Route path="/" element={<Navigate to={"/login"}/>}/>
        </Routes>
    )
}