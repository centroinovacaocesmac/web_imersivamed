import { useState, useEffect } from "react";
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import Modal from "@components/Modal";
import Button from "@components/Button";
import Title from "@components/Title";

const topics = ["Coração", "Artérias", "Veias", "Capilares", "Circulação pulmonar", "Circulação sistêmica"];

export default function Exercise(){
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [questions, setQuestions] = useState(Array.from({ length: 5 }, () => ({ question: "", options: ["","","",""], correctAnswer: 0 })));

  useEffect(() => {
    if(!selected) return;

    const fetchData = async () => {
      const ref = collection(db, "exercicio");
      const q = query(ref, where("topic", "==", selected));
      const snapshot = await getDocs(q);

      if(!snapshot.empty){
        const data = snapshot.docs[0].data();
        const loaded = data.questions;

        const filled = [
          ...loaded,
          ...Array.from({ length: 5 - loaded.length }, () => ({ question: "", options: ["", "", "", ""], correctAnswer: 0 })),
        ];
        setQuestions(filled);
      }else{
        setQuestions(Array.from({ length: 5 }, () => ({ question: "", options: ["", "", "", ""], correctAnswer: 0 })));
      }
    }

    fetchData();
  }, [selected]);

  const handleChange = (index: number, value: string) => {
    const newList = [...questions];
    newList[index].question = value;
    setQuestions(newList);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newList = [...questions];
    newList[qIndex].options[oIndex] = value;
    setQuestions(newList);
  };

  const handleCorrectChange = (qi: number, value: number) => {
    const copy = [...questions];
    copy[qi].correctAnswer = value;
    setQuestions(copy);
  };

  const handleSave = async () => {
    if (!selected) return;

    const ref = collection(db, "exercicio");
    const q = query(ref, where("topic", "==", selected));
    const snapshot = await getDocs(q);

    const data = { topic: selected, questions };

    if(!snapshot.empty){
      const docId = snapshot.docs[0].id;
      await setDoc(doc(db, "exercicio", docId), data);
    }else{
      await addDoc(ref, data);
    }

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelected(null);
    setQuestions(Array.from({ length: 5 }, () => ({ question: "", options: ["", "", "", ""], correctAnswer: 0 })));
    setViewMode(true);
  };

  return(
    <div className="flex flex-col min-h-screen gap-4 p-10">
      <div className="mb-8">
        <Title name="Cadastro de Exercício"/>
      </div>
      {!selected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {topics.map((topic) => (
            <Button key={topic} name={topic} nameClass="text-blackColor1 cursor-pointer bg-white border border-grayColor3 p-6 rounded-xl hover:shadow-lg transition" onClick={() => setSelected(topic)}/>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded">
          <div className="flex justify-between items-center">
            <h3 className="text-blackColor1 text-xl font-medium font-Poppins mb-4">Exercícios sobre {selected}</h3>
            <Button name={viewMode ? "Editar" : "Visualizar"} nameClass="text-mainColor px-4 py-2 hover:text-mainColorVariant2 transition-colors duration-300 ease-in-out" onClick={() => setViewMode(!viewMode)}/>
          </div>
          {questions.map((q, i) => (
            <div key={i} className="flex flex-col gap-2 mb-6">
              <label className="text-blackColor1 font-normal font-Poppins">Pergunta {i + 1}</label>
              {viewMode ? (
                <p className="mb-2">{q.question || <span className="text-grayColor2 text-sm font-Poppins">[vazio]</span>}</p>
              ) : (
                <input
                  type="text"
                  placeholder="Digite a pergunta"
                  value={q.question}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className="font-Poppins w-full px-4 py-2 mb-2 border border-grayColor3 rounded focus:outline-none focus:ring-1 focus:ring-grayColor4"
                />
              )}
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((opt, j) => (
                  <div key={j} className="flex items-center gap-2 mb-1">
                    {viewMode ? (
                      <>
                        <p className="text-blackColor1">
                          {opt || <span className="text-grayColor2 text-sm font-Poppins">[vazio]</span>}
                          {q.correctAnswer === j && <strong className="text-stateColorSucess1 text-sm font-Poppins ml-2">(Alternativa correta)</strong>}
                        </p>
                      </>
                    ): (
                      <>
                        <input
                          placeholder={`Alternativa ${j + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(i, j, e.target.value)}
                          className="font-Poppins border border-grayColor3 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-grayColor4"
                        />
                        <input 
                          type="radio" 
                          name={`correct-${i}`}
                          checked={q.correctAnswer === j}
                          onChange={() => handleCorrectChange(i, j)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!viewMode && (
            <div className="flex justify-end gap-2">
              <Button name="Cancelar" nameClass="w-32 py-2 text-grayColor2 rounded border hover:border-grayColor1 hover:text-grayColor1 transition-colors duration-300 ease-in-out" onClick={() => setSelected(null)}/>
              <Button name="Salvar" nameClass="w-32 py-2 bg-mainColor text-white rounded hover:bg-mainColorVariant2 transition-colors duration-300 ease-in-out" onClick={handleSave}/>
            </div>
          )}
        </div>
      )}
      <Modal isOpen={showModal} onClose={handleClose} title="Salvo com sucesso!">
        <p className="font-Poppins text-blackColor1">Exercício sobre <strong>{selected}</strong> foi salvo com sucesso!</p>
      </Modal>
    </div>
  )
}