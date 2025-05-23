import { useState } from "react";
import { collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Title from "@components/Title";

const topics = ["Coração", "Artérias", "Veias", "Capilares", "Circulação pulmonar", "Circulação sistêmica"];

export default function Content(){
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(Array.from({ length: 4 }, () => ({ title: "", description: ""})));

  const handleSelectTopic = async (topic: string) => {
    setSelected(topic);
    setIsEditing(false);

    try {
      const contentRef = collection(db, "conteudo");
      const q = query(contentRef, where("topic", "==", topic));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty){
        const docData = querySnapshot.docs[0].data();
        setDescription(docData.contents);
        console.log("Dados carregados do Firebase:", docData);
      }else{
        setDescription(Array.from({ length: 4 }, () => ({ title: "", description: "" })));
        setIsEditing(true);

      }
    } catch (error) {
      console.error("Erro ao carregar conteúdo:", error);
    }
  }

  const handleInputChange = (index: number, key: "title" | "description", value: string) => {
    const nova = [...description];
    nova[index][key] = value;
    setDescription(nova);
  };

  const handleSave = async () => {
    if(!selected) return;

    const data = {
      topic: selected,
      contents: description,
    };

    try {
      const contentRef = collection(db, "conteudo")

      const q = query(contentRef, where("topic", "==", selected));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty) {
        const docExisting = querySnapshot.docs[0];
        await setDoc(doc(db, "conteudo", docExisting.id), data);
        console.log("Conteúdo atualizado:", data);
      }else{
        await addDoc(contentRef, data);
        console.log("Conteúdo novo criado:", data);
      }
      
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelected(null);
    setDescription(Array.from({ length: 4 }, () => ({ title: "", description: "" })));
  };

  return(
    <div className="flex flex-col min-h-screen gap-4 p-10">
      <div className="my-8">
        <Title name="Cadastro de Conteúdo"/>
      </div>
      {!selected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {topics.map((topic) => (
            <Button key={topic} name={topic} nameClass="text-blackColor1 cursor-pointer bg-white border border-grayColor3 p-6 rounded-xl hover:shadow-lg transition" onClick={() => handleSelectTopic(topic)}/>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded">
          <h3 className="text-blackColor1 text-xl font-medium font-Poppins mb-4">Conteúdo sobre {selected}</h3>
          {description.map((desc, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-blackColor1 font-normal font-Poppins mb-2">Bloco {index + 1}</h4>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className="font-Poppins w-full px-4 py-2 mb-2 border border-grayColor3 rounded focus:outline-none focus:ring-1 focus:ring-grayColor4"
                    placeholder={`Título ${index + 1}`}
                    value={desc.title}
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  />
                  <textarea
                    className="w-full h-32 p-4 border border-grayColor3 rounded resize-none font-Poppins focus:outline-none focus:ring-1 focus:ring-grayColor4"
                    placeholder={`Descrição ${index + 1}`}
                    value={desc.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p className="text-lg font-normal">{desc.title || `Título ${index + 1}`}</p>
                  <p className="text-grayColor3">{desc.description || "Descrição não cadastrada."}</p>
                </>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button name="Cancelar" nameClass="w-32 py-2 text-grayColor2 rounded border hover:border-grayColor1 hover:text-grayColor1 transition-colors duration-300 ease-in-out" onClick={handleClose}/>
            {!isEditing ? (
              <Button name="Editar" nameClass="w-32 py-2 bg-mainColor text-white rounded hover:bg-mainColorVariant2 transition-colors duration-300 ease-in-out" onClick={() => setIsEditing(true)}/>
            ) : (
              <Button name="Salvar" nameClass="w-32 py-2 bg-mainColor text-white rounded hover:bg-mainColorVariant2 transition-colors duration-300 ease-in-out" onClick={handleSave}/>
            )}
          </div>
        </div>
      )}
      <Modal isOpen={showModal} onClose={handleClose} title="Sucesso!">
        <p className="font-Poppins text-blackColor1">Conteúdo sobre <strong>{selected}</strong> foi salvo com sucesso!</p>
      </Modal>
    </div>
  )
}