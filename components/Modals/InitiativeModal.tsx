import Character from "@/Types&Interfaces/Character";
import Npc from "@/Types&Interfaces/Npc";
import { useState } from "react";

type ModalProps = {
  characters: Character[],
  npc: Npc[],
  onConfirmInitiative: (rolls: {
    entity: Record<number, number>
  }) => void
}

export default function InitiativeModal ({npc, characters, onConfirmInitiative}: ModalProps) {

  const [rolls, setRolls] = useState({
    entity: {} as Record<number, number>
  })
  
  const confirmEntityInintiative = (id: number, value: number) => {
    setRolls(prev => ({
      ...prev,
      entity: {
        ...prev.entity,
        [id]: value
      }
    }))
  }

  return (
    <div className="modal_overlay">
      <div className="modal_window">
        <ul>
          {npc.map((item) => {
            return(
              <li key = {item.id} className = "">
                <div>
                  <h3>Имя: {item.name}</h3>
                </div>
                <div>
                  <input type="number" placeholder="Введите результат кубика..."
                    onChange={(e) =>
                      confirmEntityInintiative(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </li>
            )
          })
          }
          {characters.map((item) => {
            return(
              <li key = {item.id} className = "">
                <div>
                  <h3>Имя: {item.name}</h3>
                </div>
                <div>
                  <input type="number"  placeholder="Введите результат кубика..."
                    onChange={(e) =>
                      confirmEntityInintiative(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </li>
            )
          })

          }
        </ul>
        <button onClick={() => onConfirmInitiative(rolls)}>Подтвердить результат</button>
      </div>  
    </div>
  )
}