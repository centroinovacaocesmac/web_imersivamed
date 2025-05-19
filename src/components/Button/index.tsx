import type { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
    name?: string;
    iconName?: IconProp;
    iconSize?: SizeProp;
    iconColor?: string;
    textClass?: string;
    iconClass?: string;
    nameClass?: string;
    type?: "button" | "submit" | "reset";
    onClick?(): void;
}

export default function Button({name, iconName, iconSize, iconColor, textClass, iconClass, nameClass, type = "button", onClick}: ButtonProps){
    return(
        <button className={`cursor-pointer ${nameClass}`} onClick={onClick} type={type}>
            <div className={iconClass}>
                {iconName && (
                    <FontAwesomeIcon icon={iconName as IconProp} size={iconSize} color={iconColor}/>
                )}
            </div>
            <div>
                <p className={`font-Poppins ${textClass}`}>{name}</p>
            </div>
        </button>
    )
}