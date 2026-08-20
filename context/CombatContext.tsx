"use client"

import { createContext, useContext, useReducer, ReactNode } from "react";
import { CombatReducer, initialState, Combatants, AttackPayload, StartPayload} from "@/reducer/CombatReducer";
import Character from "@/Types&Interfaces/Character";
import Npc from "@/Types&Interfaces/Npc";
import { useCharacter } from "./CharacterContext";

type CombatContextValue = {
  characters: Character[];
  npcs: Npc[];
  combatants: Combatants[]
  currentTurn: number;
  currentCombatantId: number;
  isActive: boolean; 
  start: (p: StartPayload) => void; 
  end_turn: () => void; 
  back_turn: () => void;
  attack: (p: AttackPayload) => void;
}

const CombatContext=createContext<CombatContextValue | null>(null);

export function CombatProvider({children}:{children:ReactNode}){
  const [state, dispatch] = useReducer(CombatReducer, initialState);
  const {characters} = useCharacter();

  const value = {
    characters: characters,
    npcs: state.npcs,
    combatants: state.combatants,
    currentTurn: state.currentTurn,
    currentCombatantId: state.currentCombatantId,
    isActive: state.isActive, 
    start: (p: StartPayload) => dispatch({type:"START", payload: p}),
    end_turn: () => dispatch({type:"END_TURN"}), 
    back_turn: () => dispatch({type:"BACK_TURN"}),
    attack: (p: AttackPayload) => dispatch({type:"ATTACK", payload: p}),
  };

  return (
    <CombatContext.Provider value={value}>
      {children}
    </CombatContext.Provider>
  )
} 

export function useCombat(){
  const combat = useContext(CombatContext); 
  if(!combat) {
    throw Error("useCombat");
  }
  return combat;
}