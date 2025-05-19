import { type ReactNode } from "react";
import Button from "@components/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps){
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="text-right">
                <Button name="Fechar" nameClass="bg-mainColor text-white rounded hover:mainColorVariant1 px-4 py-2" onClick={onClose}/>
                </div>
            </div>
        </div>
    )
}