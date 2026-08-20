"use client"

import { useCombat } from "@/context/CombatContext"
import { mockNpc } from "@/mock-data/NpcData"
import { calculateInitiative } from "@/lib/DataUtils"
import { useState } from "react"
import InitiativeModal from "../Modals/InitiativeModal"
import ChooseModal from "../Modals/ChooseModal"
import Npc from "@/Types&Interfaces/Npc"
import "./Combat.css"

export default function Combat() {
  const {attack, start, end_turn, back_turn, currentTurn, isActive, characters, currentCombatantId, combatants, npcs} = useCombat()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [npcData, SetNpcData] = useState<Npc[]>([]);
  const [initiativeDice, setInitiativeDice] = useState({
    entity: {} as Record<number, number>
  })

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal2() {
      setIsModal2Open(true);
  }

  function closeModal2() {
    setIsModal2Open(false);
  }
  
  const handleChildData = (updatedData: Npc[]) => {
    SetNpcData(updatedData);

    if (updatedData.length > 0) {
      openModal2();
    }
  };

  const confirmInitiative = (rolls: {
    entity: Record<number, number>
  }) => {
    setInitiativeDice(rolls)
    closeModal2()
  }

  const getCombatants = () => {
    const combatants = [];
    combatants.push(...characters.map(c => ({id: c.id, type: "character" as const, initiative: calculateInitiative(c, Number(initiativeDice.entity[c.id]))})), ...npcData.map(c => ({id: c.id, type: "npc" as const, initiative: c.initiativeMod + initiativeDice.entity[c.id]})))

    return {
      combatants: combatants.sort((a, b) => b.initiative-a.initiative),
      npc: npcData
    }
  }
  
  return (
    <div>
      <div>
        <button onClick={() => openModal()}>Выбрать npc</button>
        <button onClick={() => {const payload = getCombatants(); console.log("START PAYLOAD:", payload); start(payload)}}> Начать бой</button>
      </div>
      {isActive && (
      <div>
        <span>Ход: {currentTurn}</span>
        <button onClick={() => end_turn}>Конец хода</button>
        <button onClick={() => back_turn}>Назад</button>
        <button onClick={() => attack}>Атаковать</button>
      </div>
      )}

      {isActive && (
        <div>
          {combatants.map((comb) => {
            const character = characters.find((char) => char.id === comb.id);
            const npc = npcs.find((n) => n.id === comb.id);
            const combatantData = character || npc;
            if (!combatantData) return null;

            const isCurrentTurn = currentCombatantId === combatantData.id;
            const zoneClass = character ? "char_zone" : "npc_zone";

            return (
              <div key={comb.id} className="zone">
                <div className={zoneClass}>
                  <div className={isCurrentTurn ? "turn_on" : ""}>
                    <h3>{combatantData.name}</h3>
                    <p>{combatantData.currentHp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {isModalOpen && (
        <ChooseModal
          onClose = {closeModal}
          npc = {mockNpc}
          onChoose = {handleChildData}
        />
      )}

      {isModal2Open && (
        <InitiativeModal
          characters = {characters}
          npc = {npcData}
          onConfirmInitiative={confirmInitiative}
        />
      )}
    </div>
  )
}