import BaseInterface from "./BaseInterface";

export default interface Feat extends BaseInterface {
  requirements?: string;
  abilityBonus?: Partial<Record<string, number>>;
  saveBonus?: Record<string, number>;
  skillBonus?: Record<string, number>;
  extraResource?: { name: string; max: number };
  specialRule?: string;
  speedBonus?: number;
}