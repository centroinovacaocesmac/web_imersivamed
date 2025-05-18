import { useAuth } from "@contexts/index";

export default function Login() {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login Admin</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}