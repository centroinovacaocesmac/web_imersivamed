import Banner from "@components/Banner";
import Card from "@components/Card";
import Title from "@components/Title";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-4 p-10">
      <div className="mb-8">
        <Title name="Admin"/>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <Banner/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Conteúdo" description="Gerenciar conteúdos do app" route="/conteudo" />
          <Card title="Exercício" description="Criar e editar exercícios" route="/exercicio" />
          <Card title="Avaliação" description="Cadastrar avaliações" route="/avaliacao" />
        </div>
      </div>
    </div>
  );
}
