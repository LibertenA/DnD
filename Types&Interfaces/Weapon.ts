import BaseInterface from "./BaseInterface";

export default interface Weapon extends  BaseInterface {
  damageDice: string;   // "1d8", "2d6" и т.д.
  damageType: string;   // piercing, fire, etc.
  properties: string[]; // finesse, light, heavy, reach...
  ability: 'str' | 'dex'; // базовая характеристика для броска, если finesse -> dex при желании
}