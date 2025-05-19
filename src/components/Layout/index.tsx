import { Outlet } from "react-router-dom";
import SideBar from "@components/SideBar";

export default function Layout(){
  return(
    <div className="flex h-screen">
      <SideBar/>
      <main className="flex-1 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  )
}