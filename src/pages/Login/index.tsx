import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import Button from "@components/Button";
import LogoImersiva from "@assets/Logo/Logo.svg";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      console.error("Erro ao logar:", error);
      setError("Email ou senha inválidos.");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return(
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white flex flex-col justify-center items-center rounded shadow w-96 h-96 gap-5 px-4">
        <div className="flex flex-col items-center gap-4">
          <img src={LogoImersiva} alt="Logo" className="w-44"/>
          <h1 className="font-Poppins text-lg font-normal text-blackColor1">Entrar no Gerenciador Web</h1>
        </div>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" className="w-full px-4 py-2 border border-grayColor3 rounded focus:outline-none focus:ring-1 focus:ring-grayColor4" required/>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Senha" className="w-full px-4 py-2 border border-grayColor3 rounded focus:outline-none focus:ring-1 focus:ring-grayColor4" required/>
        {error && <p className="text-stateColorErro1 text-sm">{error}</p>}
        <Button name="Entrar" nameClass="bg-mainColor w-full text-white py-2 rounded hover:bg-mainColorVariant1" type="submit"/>
      </form>
    </div>
  );
}