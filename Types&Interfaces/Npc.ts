export default interface Npc {
  id: number;
  name: string;
  type: string;
  avatar?: string;
  ac: number;
  maxHp: number;
  currentHp: number;
  speed: number; // в метрах
  initiativeMod: number;
  abilities: {
    str: number; dex: number; con: number;
    int: number; wis: number; cha: number;
  };
  resistances: string[];   // типы урона
  immunities: string[];    // типы урона
  vulnerabilities: string[];
  resources?: { name: string; current: number; max: number }[];
  weaponsID?: number
  proficiencyBonus: number;
}