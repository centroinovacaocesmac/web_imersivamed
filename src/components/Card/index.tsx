import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  route: string;
}

export default function Card({ title, description, route }: CardProps) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(route)} className="cursor-pointer bg-white border border-grayColor3 p-6 rounded-xl hover:shadow-lg transition">
      <h3 className="text-blackColor1 text-base font-medium font-Poppins mb-2 lg:text-xl">{title}</h3>
      <p className="text-grayColor2 text-sm font-normal font-Poppins lg:text-base">{description}</p>
    </div>
  );
}