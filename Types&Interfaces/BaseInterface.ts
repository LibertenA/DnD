export default interface BaseInterface {
  id: number;
  name: string;
  acBonus?: number;
  attackBonus?: number;
  damageBonus?: Record<string, number>;
  description?: string;
}