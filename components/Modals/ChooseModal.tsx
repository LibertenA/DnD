import Npc from "@/Types&Interfaces/Npc";
import { useState } from "react";
import "./Modal.css"

type ModalProps = {
  onClose: () => void,
  npc: Npc[]
  onChoose: (x: Npc[]) => void,
}

export default function ChooseModal ({onClose, npc, onChoose}: ModalProps) {
  const [chosen, setChosen] = useState<Npc[]>([])

  const chooseNpc = (npc: Npc) => {
    if (!(chosen.some(n => n === npc))) {
      setChosen(prev => [...prev, npc])
    } else {
      setChosen(prev => prev.filter(np => np !== npc ));
    }
  }


  return (
    <div className="modal_overlay">
      <div className="modal_window">
        <ul>
          {npc.map((item) => {
            const isChosen = chosen.some((n) => n === item);
            return(
              <li key = {item.id} className = {isChosen ? "item__active" : "item"} onClick = {() => chooseNpc(item)}>
                <div>
                  <h3>Имя: {item.name}</h3>
                  <p>Тип врага: {item.type}</p>
                  <p>Хитпоинты: {item.currentHp}</p>
                </div>
              </li>
            )
          })

          }
        </ul>
      <button onClick={() => {onChoose(chosen); onClose()}}>Подтвердить выбор</button>
      </div>
      
    </div>
  )
}