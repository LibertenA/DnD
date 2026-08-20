import BaseInterface from "./BaseInterface";

export default interface Equipment extends  BaseInterface { 
  category: 'head' | 'armor' | 'gloves' | 'boots' | 'amulet' | 'ring' | 'shield';
  abilityBonus: Partial<Record<string, number>>;
  saveBonus?: Record<string, number>;
  skillBonus: Record<string, number>;
  // для брони дополнительно
  armorType: 'light' | 'medium' | 'heavy' | 'none';
  baseAC: number;
  maxDexBonus: number | null; // null для heavy
  stealthDisadvantage: boolean;
}