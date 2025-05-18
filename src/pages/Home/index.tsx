import Card from "@components/Card";

export default function Home() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Conteúdo" description="Gerenciar conteúdos do app" route="/conteudo" />
        <Card title="Exercício" description="Criar e editar exercícios" route="/exercicio" />
        <Card title="Avaliação" description="Cadastrar avaliações" route="/avaliacao" />
      </div>
    </div>
  );
}
