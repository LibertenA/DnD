/*export default interface StatusTemplate {
  id: string;
  name: string;
  description: string;
  type: 'instant' | 'continuous' | 'periodic';
  periodicTrigger?: 'startOfTurn' | 'endOfTurn';
  modifiers?: {
    ac?: number;
    attackMod?: number;
    damageMod?: number;
    abilityCheckMod?: Record<string, number>;
    saveMod?: Record<string, number>;
    speedMultiplier?: number; // 0.5, 0 и т.д.
    resistances?: string[];
    vulnerabilities?: string[];
    immunities?: string[];
    damageOnPeriodic?: { dice: string; type: string }; // например, 1d4 fire
  };
  duration?: { type: 'rounds' | 'minutes' | 'untilDispelled'; value: number };
  endCondition?: string; // описание условия окончания
}

export default interface ActiveStatus {
  templateId: string;
  sourceId?: string; // кто наложил
  remainingDuration?: number; // в раундах
  startRound?: number; // раунд боя, когда наложено
}*/