import Spell from "./Spell";
import Feat from "./Feat";

export default interface Character {
  id: number;
  name: string;
  race: string;
  avatar?: string;
  class: string;
  subclass?: string;
  level: number;
  abilities: {
    str: number; dex: number; con: number;
    int: number; wis: number; cha: number;
  };
  maxHp: number; 
  currentHp: number; 
  tempHp: number; //Временные хп
  speed: number;
  proficiencyBonus: number; // бонус владения
  skills?: Record<string, boolean>; // владение навыками: { "athletics": true ... }
  savingThrows?: Record<string, boolean>; // { "str": true, "dex": false ... } Спасбрроски
  equipmentID?: {
    head?: number;
    armor?: number;
    gloves?: number;
    boots?: number;
    amulet?: number;
    ring1?: number;
    ring2?: number;
    shield?: number;
  };
  weaponsID?: number;
  spellcasting?: {
    ability: keyof Character['abilities']; // заклинательная характеристика
    slots: Record<number, { max: number; current: number }>; // уровень ячейки -> {max, current}
    spells: Spell[]; // известные заклинания
    cantrips: Spell[]; //фокусы
  };
  spellSaveDC?: number; // 8 + модификатор характеристики + бонус владения. Этол число которое надо перебить тому против кого заклинание
  classResources?: {
    name: string;
    current: number;
    max: number;
    shortRestRecovery?: boolean; // восстанавливается на коротком отдыхе
    longRestRecovery?: boolean; // восстанавливается на длительном отдыхе
  }[];
  feats?: Feat[];
  //resistances: string[]; 
  //immunities: string[]; 
  //vulnerabilities: string[];
  armorBonus?: number;
  initiative?: number;
}