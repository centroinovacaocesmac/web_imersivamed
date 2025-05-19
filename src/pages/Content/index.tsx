import { useState } from "react";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Title from "@components/Title";

const topics = ["Coração", "Artérias", "Veias", "Capilares", "Circulação pulmonar", "Circulação sistêmica"];

export default function Content(){
  const [selected, setSelected] = useState<string | null>(null);

  const [blocks, setBlocks] = useState([
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (index: number, field: "title" | "description", value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    const content = {
      topic: selected,
      contents: blocks,
    };

    console.log("Conteúdo salvo:", content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    setBlocks([
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ]);
  };

  return(
    <div className="flex flex-col min-h-screen gap-4 p-10">
      <div className="mb-8">
        <Title name="Cadastro de Conteúdo"/>
      </div>
      {!selected ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {topics.map((topic) => (
            <Button name={topic} nameClass="text-blackColor1 cursor-pointer bg-white border border-grayColor3 p-6 rounded-xl hover:shadow-lg transition" onClick={() => setSelected(topic)}/>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded">
          <h3 className="text-blackColor1 text-xl font-medium font-Poppins mb-4">Conteúdo sobre {selected}</h3>
          {blocks.map((bloco, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-blackColor1 font-normal font-Poppins mb-2">Bloco {index + 1}</h4>
              <input
                type="text"
                className="font-Poppins w-full px-4 py-2 mb-2 border border-grayColor3 rounded"
                placeholder={`Título ${index + 1}`}
                value={bloco.title}
                onChange={(e) => handleInputChange(index, "title", e.target.value)}
              />
              <textarea
                className="w-full h-32 p-4 border border-grayColor3 rounded resize-none font-Poppins"
                placeholder={`Descrição ${index + 1}`}
                value={bloco.description}
                onChange={(e) => handleInputChange(index, "description", e.target.value)}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 w-32a">
            <Button name="Cancelar" nameClass="w-32 py-2 text-grayColor2 rounded border hover:border-grayColor1 hover:text-grayColor1 transition-colors duration-300 ease-in-out" onClick={() => setSelected(null)}/>
            <Button name="Salvar" nameClass="w-32 py-2 bg-mainColor text-white rounded hover:bg-white hover:border hover:text-mainColor transition-colors duration-300 ease-in-out" onClick={handleSave}/>
          </div>
        </div>
      )}
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Sucesso!">
        <p className="font-Poppins text-blackColor1">Conteúdo de <strong>{selected}</strong> salvo com sucesso!</p>
      </Modal>
    </div>
  )
}