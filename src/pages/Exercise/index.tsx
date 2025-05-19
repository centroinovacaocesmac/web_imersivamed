import { useState } from "react";
import Modal from "@components/Modal";
import Button from "@components/Button";
import Title from "@components/Title";

const topics = ["Coração", "Artérias", "Veias", "Capilares", "Circulação pulmonar", "Circulação sistêmica"];

export default function Exercise(){
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState(
    Array.from({ length: 5 }, () => ({
      pergunta: "",
      opcoes: ["", "", "", ""],
    }))
  );

  const handleQuestionChange = (index: number, value: string) => {
    const nova = [...questions];
    nova[index].pergunta = value;
    setQuestions(nova);
  };

  const handleOpcaoChange = (qIndex: number, oIndex: number, value: string) => {
    const nova = [...questions];
    nova[qIndex].opcoes[oIndex] = value;
    setQuestions(nova);
  };

  const handleSave = () => {
    const dados = {
      topic: selected,
      questions,
    };

    console.log("Exercício salvo:", dados);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    setQuestions(
      Array.from({ length: 5 }, () => ({
        pergunta: "",
        opcoes: ["", "", "", ""],
      }))
    );
  };

  return(
    <div className="flex flex-col min-h-screen gap-4 p-10">
      <div className="mb-8">
        <Title name="Cadastro de Exercício"/>
      </div>
      {!selected ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {topics.map((topic) => (
            <Button name={topic} nameClass="text-blackColor1 cursor-pointer bg-white border border-grayColor3 p-6 rounded-xl hover:shadow-lg transition" onClick={() => setSelected(topic)}/>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded">
          <h3 className="text-blackColor1 text-xl font-medium font-Poppins mb-4">Exercícios sobre {selected}</h3>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="flex flex-col gap-2 mb-6">
              <label className="text-blackColor1 font-normal font-Poppins">Pergunta {qIndex + 1}</label>
              <input
                type="text"
                placeholder="Digite a pergunta"
                value={q.pergunta}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="font-Poppins w-full px-4 py-2 mb-2 border border-grayColor3 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                {q.opcoes.map((opcao, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Alternativa ${oIndex + 1}`}
                    value={opcao}
                    onChange={(e) => handleOpcaoChange(qIndex, oIndex, e.target.value)}
                    className="font-Poppins border border-grayColor3 rounded px-4 py-2"
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-2">
            <Button name="Cancelar" nameClass="w-32 py-2 text-grayColor2 rounded border hover:border-grayColor1 hover:text-grayColor1 transition-colors duration-300 ease-in-out" onClick={() => setSelected(null)}/>
            <Button name="Salvar" nameClass="w-32 py-2 bg-mainColor text-white rounded hover:bg-white hover:border hover:text-mainColor transition-colors duration-300 ease-in-out" onClick={handleSave}/>
          </div>
        </div>
      )}
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Cadastro de Exercício">
        <p>Exercício de <strong>{selected}</strong> cadastrado com sucesso.</p>
      </Modal>
    </div>
  )
}