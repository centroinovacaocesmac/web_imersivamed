import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faBook, faHouse, faPenRuler, faRightFromBracket, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import LogoImersiva from "@assets/Logo/Logo.svg";
import Button from "@components/Button";

const navItems = [
    { icon: faHouse, label: "Home", path: "/home" },
    { icon: faBook, label: "Conteúdo", path: "/conteudo" },
    { label: "Aprendizado", children: [
            { label: "Exercício", path: "/exercicio" },
            { label: "Avaliação", path: "/avaliacao" },
        ]
    },
];

export default function SideBar(){
    const { logout } = useAuth();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return(
        <>
            <div>
                <Button nameClass={`md:hidden fixed top-4 left-4 z-50 text-mainColor bg-white px-4 py-2 border border-grayColor4 rounded transition-all duration-300 ease-in-out ${isSidebarOpen ? "left-66" : "left-4"}`} onClick={toggleSidebar} iconName={isSidebarOpen ? faXmark : faBars}/>
            </div>
            <aside className={`bg-white flex flex-col w-64 px-4 py-4 font-Poppins border-r border-[#E0E0E0] fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto`}>
                <div className="w-48">
                    <img src={LogoImersiva} alt="Logo"/>
                </div>
                <nav className="flex flex-col gap-4 py-12">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.children ? (
                                <div>
                                    <button
                                        onClick={() => toggleMenu(item.label)}
                                        className={`
                                            flex justify-between items-center text-base lg:text-lg px-4 py-2 w-full text-blackColor1 text-left rounded
                                            transition-colors duration-300 ease-in-out cursor-pointer hover:text-mainColor
                                            ${openMenu === item.label ? "bg-[#f8f8ff]" : ""}
                                        `}>
                                        <span className="flex items-center gap-2">
                                            {item.label === "Aprendizado" && (
                                                <FontAwesomeIcon icon={faPenRuler}/>
                                            )}
                                            {item.label}
                                        </span>
                                        <FontAwesomeIcon
                                            icon={openMenu === item.label ? faChevronUp : faChevronDown}
                                            className="text-sm transition-transform duration-300"/>
                                    </button>
                                    <div
                                        className={`
                                            overflow-hidden transition-all duration-300 ease-in-out
                                            ${openMenu === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                                        `}>
                                        <div className="flex flex-col gap-2 pt-2 pl-4">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    to={child.path}
                                                    className={`
                                                        block text-base lg:text-lg px-4 py-2 text-blackColor1 rounded transition-colors duration-300
                                                        ${location.pathname === child.path
                                                            ? "text-mainColor"
                                                            : "hover:text-mainColor"}
                                                    `}>
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`
                                        flex flex-row items-center gap-2 text-blackColor1 text-base lg:text-lg px-4 py-2 rounded transition-colors duration-300
                                        ${location.pathname === item.path
                                            ? "text-mainColor"
                                            : "hover:text-mainColor"}
                                    `}>
                                        {item.icon && (
                                            <FontAwesomeIcon icon={item.icon}/>
                                        )}
                                        {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
                <div className="py-4 mt-auto ">
                    <Button
                    name="Sair"
                    iconName={faRightFromBracket}
                    nameClass={`
                        w-full flex items-center text-base lg:text-lg gap-2 px-4 py-2 rounded 
                        transition-colors duration-300 ease-in-out text-blackColor1 hover:text-mainColor 
                    `}
                    iconClass="transition-transform duration-300 group-hover:translate-x-1"
                    onClick={logout}
                    />
                </div>
            </aside>
        </>
    )
}