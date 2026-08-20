import Character from "@/Types&Interfaces/Character";
import Npc from "@/Types&Interfaces/Npc";
import {calculateAttackBonus, calculateArmorClass, calculateDamage} from "@/lib/DataUtils"
import { mockWeapons } from "@/mock-data/WeaponData";
import { mockEquipment } from "@/mock-data/EquipmentData";

export type Combatants = {
  id: number;
  type: "character" | "npc";
  initiative: number;
}

export type StartPayload = {
  combatants: Combatants[];
  npc: Npc[];
}

export type CombatState = {
  characters:Character[];
  npcs:Npc[];
  combatants: Combatants[]
  currentTurn: number;
  currentCombatantId: number;
  isActive: boolean;
}

export const initialState: CombatState={
  characters:[],
  npcs: [],
  combatants: [],
  currentTurn: 0,
  currentCombatantId: 0,
  isActive: false,
}

export type AttackPayload = {
  attackerId: number;
  defenderId: number;
  attackRoll: number;
  damageRoll: number;
  attacker_type: "character" | "npc";
  defender_type: "character" | "npc";  
};



// const newValue = prompt("Введите значение выпавшее на кубике");
// const nameOfDefender = prompt("Введите имя персонажа которого атакуете")?.trim().toLowerCase();
// if (!newValue || !nameOfDefender) return;

// // const attacker = characters.find(c => c.id === characterId);
// // if (!attacker) return;


export type Action =| {type: "START"; payload: StartPayload} | {type: "END_TURN"} | {type: "BACK_TURN"} | {type: "ATTACK"; payload: AttackPayload} | {type: "ATTACK"; payload: AttackPayload} | {type: "ATTACK"; payload: AttackPayload}

export function CombatReducer(state:CombatState, action:Action): CombatState{
  switch(action.type) {
    case "START":
      return {
        ...state,
        isActive: true,
        currentTurn: 1,
        currentCombatantId: 0,
        combatants: action.payload.combatants,
        npcs: action.payload.npc
      }

    case "END_TURN": {
      if (state.currentCombatantId < state.combatants.length - 1) {
        return {
          ...state,
          currentCombatantId: state.currentCombatantId + 1,
        } 
      } 

      return {
        ...state,
        currentTurn: state.currentTurn + 1,
        currentCombatantId: 0,
      }
    }

    case "BACK_TURN": {
      if (state.currentCombatantId === 0) {
        return {
          ...state,
          currentTurn: state.currentTurn - 1,
          currentCombatantId: state.combatants.length - 1,
        }
      } else if (state.currentCombatantId < state.combatants.length - 1 && state.currentCombatantId != 0) {
        return {
          ...state,
          currentCombatantId: state.currentCombatantId - 1,
        } 
      } 

      return state
    }

    case "ATTACK": {
      let isCritical = (action.payload.attackRoll === 20 ? true : false)
      let attackRoll = 0;
      let defenderAC = 0;
      let damageRoll = 0;
      let isHit = false;

      if (action.payload.attacker_type === "character") {
        attackRoll = action.payload.attackRoll + calculateAttackBonus(mockWeapons, state.characters[action.payload.attackerId].weaponsID ?? 0, state.characters[action.payload.attackerId]);
        defenderAC = Number(state.npcs[action.payload.defenderId].ac)
        damageRoll = !isCritical ? Number(action.payload.damageRoll) + calculateDamage(mockWeapons, state.characters[action.payload.attackerId].weaponsID ?? 0, state.characters[action.payload.attackerId]) : (Number(action.payload.damageRoll) * 2) + calculateDamage(mockWeapons, state.characters[action.payload.attackerId].weaponsID ?? 0, state.characters[action.payload.attackerId]);
        if (attackRoll >= defenderAC) {
        isHit = true;
        return{
          ...state,
          npcs: state.npcs.map((npc) => {
            if (npc.id === action.payload.defenderId) {
              return {
                ...npc,
                currentHp: npc.currentHp - damageRoll
              };
            }
            return npc
          })
        }
      }
      } else if (action.payload.defender_type === "character"){
        attackRoll = action.payload.attackRoll + calculateAttackBonus(mockWeapons, state.npcs[action.payload.attackerId].weaponsID ?? 0, undefined, state.npcs[action.payload.attackerId]);
        defenderAC = Number(calculateArmorClass(state.characters[action.payload.defenderId], mockEquipment))
        damageRoll = !isCritical ? Number(action.payload.damageRoll) + calculateDamage(mockWeapons, state.npcs[action.payload.attackerId].weaponsID ?? 0, undefined, state.npcs[action.payload.attackerId]) : (Number(action.payload.damageRoll) * 2) + calculateDamage(mockWeapons, state.npcs[action.payload.attackerId].weaponsID ?? 0, undefined, state.npcs[action.payload.attackerId]);
        if (attackRoll >= defenderAC) {
        isHit = true;
        return{
          ...state,
          characters: state.characters.map((character) => {
            if (character.id === action.payload.defenderId) {
              return {
                ...character,
                currentHp: character.currentHp - damageRoll
              };          
            }
            return character
          })
        }
      }
      }
      
      return state
      //if(!isHit) {alert("Мимо!");}; 
    }
  }
}