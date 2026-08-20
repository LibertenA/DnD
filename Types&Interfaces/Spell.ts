export default interface Spell {
  id: string;
  name: string;
  level: number; // 0 - заговор
  castingTime: string;
  range: string;
  duration: string;
  concentration: boolean;
  description: string;
  savingThrow?: {
    ability: string;
    halfDamageOnSave?: boolean;
  };
  attackRoll?: boolean; // заклинание с броском атаки
  damage?: {
    dice: string;
    type: string;
    scalingPerSlot?: string; // дополнительные кубики за уровень ячейки
  };
  effect?: string; // особый эффект
  type: 'attack' | 'save' | 'heal' | 'buff';
}