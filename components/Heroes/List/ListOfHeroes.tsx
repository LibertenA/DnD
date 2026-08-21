"use client"

import Card from "../Card/Card"
import "./List.css"
import {calculateAttackBonus, calculateArmorClass, calculateDamage, calculateInitiative} from "@/lib/DataUtils"
import { mockWeapons } from "@/mock-data/WeaponData";
import { mockEquipment } from "@/mock-data/EquipmentData";
import { useCharacter } from "@/context/CharacterContext";

export default function List () {

  const {characters, getRest, changeValue, changeAbilityValue} = useCharacter();

  /*const newAttack = (characterID: number) => {
    const updatedData = attack_damage(characterID, characters)
    if (!updatedData) {
       return characters
    }

    setCharacters(updatedData);
    localStorage.setItem('character_data', JSON.stringify(updatedData));
  }*/

  return (
    <section className="characters">
      <div className="characters_list">
        {characters.map((character) => (
          <Card
              key={character.id}
              character={{
                  id: character.id,
                  name: character.name,
                  class: character.class,
                  subclass: character.subclass,
                  race: character.race,
                  level: character.level,
                  currentHp: character.currentHp,
                  maxHp: character.maxHp,
                  tempHp: character.tempHp,
                  speed: character.speed,
                  abilities: character.abilities,
                  proficiencyBonus: character.proficiencyBonus,
                  armorClass: calculateArmorClass(character, mockEquipment),
                  /*resistances: character.resistances,
                  immunities: character.immunities,
                  vulnerabilities: character.vulnerabilities,*/
                  equipmentID: character.equipmentID,
                  weaponsID: character.weaponsID,
                  attack: calculateAttackBonus( mockWeapons, character.weaponsID ?? 0, character),
                  damage: calculateDamage(mockWeapons, character.weaponsID ?? 0, character),
                  initiative: calculateInitiative(character, 0)
              }}
              changeValue={changeValue}
              changeAbilityValue={changeAbilityValue} 
          />
        )
        )}

      </div>
      <div className="rest">
          <button className="rest__button" onClick={() => getRest()}>Полноценный отдых</button>
          <button className="rest__button">Короткий отдых</button>
      </div>
    </section>
  )
}