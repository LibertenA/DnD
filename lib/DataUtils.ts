import Character from "@/Types&Interfaces/Character";
import Weapon from "@/Types&Interfaces/Weapon";
import Equipment from "@/Types&Interfaces/Equipment";
import Npc from "@/Types&Interfaces/Npc";

export function calculateAttackBonus(weapons: Weapon[], weaponID: number, character?: Character, npc?: Npc) {
  const weapon = weapons.find(
    weapon => weapon.id === weaponID
  );
  if (!weapon) return 0;
  if (character) {
    return weapon.ability == 'dex' ? Math.floor((character.abilities.dex - 10) /2) + character.proficiencyBonus + (weapon.attackBonus ?? 0) : Math.floor((character.abilities.str - 10) /2) + character.proficiencyBonus + (weapon.attackBonus ?? 0)
  } else if (npc) {
    return weapon.ability == 'dex' ? Math.floor((npc.abilities.dex - 10) /2) + npc.proficiencyBonus + (weapon.attackBonus ?? 0) : Math.floor((npc.abilities.str - 10) /2) + npc.proficiencyBonus + (weapon.attackBonus ?? 0)
  } else {
    return 0
  }
  
}

export function calculateArmorClass(character: Character, equipment: Equipment[]) {
  const getEquipment = (id?: number) => {
    if (id === undefined) return undefined;

    return equipment.find(item => item.id === id);
  };

  const armor = getEquipment(character.equipmentID?.armor);
  const head = getEquipment(character.equipmentID?.head);
  const gloves = getEquipment(character.equipmentID?.gloves);
  const boots = getEquipment(character.equipmentID?.boots);
  const amulet = getEquipment(character.equipmentID?.amulet);
  const ring1 = getEquipment(character.equipmentID?.ring1);
  const ring2 = getEquipment(character.equipmentID?.ring2);
  const shield = getEquipment(character.equipmentID?.shield);

  if (equipment.length === 0) return 0;
  const baseAC = (armor?.baseAC ?? 0) + (armor?.acBonus ?? 0) + (head?.acBonus ?? 0) + (gloves?.acBonus ?? 0) + (boots?.acBonus ?? 0) + (ring1?.acBonus ?? 0) + (ring2?.acBonus ?? 0) + (amulet?.acBonus ?? 0) + (shield?.acBonus ?? 0)
  return baseAC + (character.armorBonus ?? 0);
}

export function calculateDamage(weapons: Weapon[], weaponID: number, character?: Character, npc?: Npc) {
  const weapon = weapons.find(
    weapon => weapon.id === weaponID
  );
  if (!weapon) return 0;
  if (character) {
    return weapon.ability == 'dex' ? Math.floor((character.abilities.dex - 10) /2) : Math.floor((character.abilities.str - 10) /2)
  } else if (npc) {
    return weapon.ability == 'dex' ? Math.floor((npc.abilities.dex - 10) /2) : Math.floor((npc.abilities.str - 10) /2)
  } else {
    return 0
  }
}

export function calculateInitiative(character: Character, dice: number) {
  return dice + Math.floor((character.abilities.dex - 10) /2) + (character.initiative ?? 0);
}

/*export function attack_damage(characterId: number, characters: Character[]) {
  const newValue = prompt("Введите значение выпавшее на кубике");
  const nameOfDefender = prompt("Введите имя персонажа которого атакуете")?.trim().toLowerCase();

  if (!newValue || !nameOfDefender) return;
  
  let isCritical = (newValue === '20' ? true : false)

  const attacker = characters.find(c => c.id === characterId);
  if (!attacker) return;

  const defender = characters.find(c => String(c.name).trim().toLowerCase() === nameOfDefender);
  if (!defender) return;

  const attackRoll = Number(newValue) + calculateAttackBonus(attacker, mockWeapons, attacker.weaponsID ?? 0);
  const defenderAC = Number(calculateArmorClass(defender, mockEquipment))
  let isHit = false;

  if (attackRoll >= defenderAC) {
    isHit = true;
    const newDamageValue = prompt("Введите значение урона");
    if (!newDamageValue) return characters; 
    const damageRoll = !isCritical ? Number(newDamageValue) + calculateDamage(attacker, mockWeapons, attacker.weaponsID ?? 0) : (Number(newDamageValue) * 2) + calculateDamage(attacker, mockWeapons, attacker.weaponsID ?? 0);
  }

  if(!isHit) {alert("Мимо!");}
  const AttackResult = {}
  return AttackResult; 
}*/