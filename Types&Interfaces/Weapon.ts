import BaseInterface from "./BaseInterface";

export default interface Weapon extends  BaseInterface {
  damageDice: string;   // "1d8", "2d6" и т.д.
  damageType: string;   // колющий, некротический
  properties: string[]; // изящное, легкое, тяжелое,
  ability: 'str' | 'dex'; // базовая характеристика для броска, если изящное -> dex при желании
}