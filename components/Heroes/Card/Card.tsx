import Character from "@/Types&Interfaces/Character"
import "./Card.css";

type CharacterCardProps = {
  character: Character & {
    armorClass: number;
    attack: number; 
    damage: number; 
    initiative: number
  };

  changeValue: (characterId: number, key: keyof Character) => void;
  changeAbilityValue: (characterId: number, abilityKey: string) => void;
}

export default function Card ({character, changeValue, changeAbilityValue, /*newAttack*/}: CharacterCardProps) {

  const str = Math.floor(((character.abilities.str) - 10)/2);
  const dex = Math.floor(((character.abilities.dex) - 10)/2);
  const con = Math.floor(((character.abilities.con) - 10)/2);
  const int = Math.floor(((character.abilities.int) - 10)/2);
  const wis = Math.floor(((character.abilities.wis) - 10)/2);
  const cha = Math.floor(((character.abilities.cha) - 10)/2);

  return (
    <div className="character">
      <div className="character__information">
        <p className="name">
          Имя: {character.name} 
        </p>
        <p className="class">
          Уровень: {character.level} {character.class} ({character.subclass})
        </p>
        <p className="race">
          Раса: {character.race}
        </p>
      </div>
      <div className="hitpoints_armor">
        <div className="hitpoints__place" onClick={() => changeValue(character.id, 'currentHp')}>
          <p className="hitpoints__text">{character.currentHp}({character.maxHp})</p>
          <p className="hitpoints__text"> + </p>
          <p className="hitpoints__text">{character.tempHp} вр.</p>
        </div>
        <div className="armor__place" onClick={() => changeValue(character.id, 'armorBonus')}>
          <p className="armor__text">{character.armorClass} КД/КБ</p>
        </div>
      </div>

      <div className="button__change">
        <p className="speed">Скорость: {character.speed} метров</p>
        <button className="change_btn" onClick={() => changeValue(character.id, 'speed')}><img src="/edit.png" alt="" className="edit__button"/></button>
      </div>

      <table className="abilities_table">
        <tbody>
          <tr className="abilities_table_row">
            <th className="abilities_table_th">СИЛ</th>
            <th className="abilities_table_th">ЛВК</th>
            <th className="abilities_table_th">ВЫН</th>
            <th className="abilities_table_th">ИНТ</th>
            <th className="abilities_table_th">МДР</th>
            <th className="abilities_table_th">ХАР</th>
          </tr>
          <tr className="abilities_table_row">
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.str}({str}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'str')}><img src="/edit.png" alt="" className="edit__button"/></button>        
              </div>
            </td>
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.dex}({dex}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'dex')}><img src="/edit.png" alt="" className="edit__button"/></button>
              </div>
            </td>
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.con}({con}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'con')}><img src="/edit.png" alt="" className="edit__button"/></button>
              </div>
            </td>
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.int}({int}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'int')}><img src="/edit.png" alt="" className="edit__button"/></button>
              </div>
            </td>
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.wis}({wis}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'wis')}><img src="/edit.png" alt="" className="edit__button"/></button>
              </div>
            </td>
            <td className="abilities_table_td">
              <div className="table_content">
                {character.abilities.cha}({cha}) <button className="change_btn" onClick={() => changeAbilityValue(character.id,'cha')}><img src="/edit.png" alt="" className="edit__button"/></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="button__change">
        <p className="initiative">Инициатива: {character.initiative}</p>
        <button className="change_btn" onClick={() => changeValue(character.id, 'initiative')}> <img src="/edit.png" alt="" className="edit__button"/></button>
      </div>

      <div className="button__change">
        <p className="proficiency">Бонус мастерства: {character.proficiencyBonus}</p>
        <button className="change_btn" onClick={() => changeValue(character.id, 'proficiencyBonus')}><img src="/edit.png" alt="" className="edit__button"/></button>
      </div>
      {/*<p className="status">{character.statuses.map((status) => (
        status = {status.templateID}
        ))}
      </p>*/}
      {/* <div className="button__change">
        <p className="resistances">Сопротивляемость: {character.resistances}, {character.immunities}, {character.vulnerabilities}</p>
        <button className="change_btn" onClick={() => changeValue(character.id, 'resistances')}><img src="/edit.png" alt="" className="edit__button"/></button>
      </div> */}

      <p className="equipment">Снаряжение: {}</p>
      <p className="weapon">Оружие: {character.weaponsID}</p>
      <p className="attack">Атака: {character.attack}</p>
      <p className="damage">Урон: {character.damage}</p>
      {/* <button className="attack_btn" onClick={() => newAttack(character.id)}>Атаковать</button> */}
    </div>
  )
}