import { useAuth } from "@contexts/index";
import Button from "@components/Button";

export default function Header(){
    const { logout } = useAuth();

    return(
        <header className="bg-white flex justify-between items-center px-6 py-4 border-b border-[#E0E0E0]">
            <h1 className="text-[#282828] text-lg font-bold">Admin</h1>
            <Button name="Sair" nameClass="cursor-pointer" onClick={logout}/>
        </header>
    )
}