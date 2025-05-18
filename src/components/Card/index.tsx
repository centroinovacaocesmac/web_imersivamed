import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  route: string;
}

export default function Card({ title, description, route }: CardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}