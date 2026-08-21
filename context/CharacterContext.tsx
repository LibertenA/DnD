"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Character from "@/Types&Interfaces/Character";
import { getCharacters } from "@/lib/api/characters";
import { mockCharacters } from "@/mock-data/CharactersData";

type CharacterContextValue = {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  getRest: () => void;
  changeValue: (characterId: number, key: keyof Character | 'armorBonus' | 'initiative') => void;
  changeAbilityValue: (characterId: number, abilityKey: string) => void;
}

const CharacterContext=createContext<CharacterContextValue | null>(null);

export function CharacterProvider({children} : {children:ReactNode}){

  const [characters, setCharacters]=useState<Character[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  /*useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true)
        const characters = await getCharacters();
        setCharacters(characters);
      } catch {
        setError("Не удалось загрузить персонажей");
      } finally {
        setLoading(false)
      }
    }

    loadCharacters();
  }, [])*/
  
  useEffect(() => {
    const localData = localStorage.getItem('character_data');
    
    if (localData) {
      setCharacters(JSON.parse(localData) as Character[]);
    } else {
      localStorage.setItem('character_data', JSON.stringify(mockCharacters));
      setCharacters(mockCharacters);
    }
  }, []);

  function getRest() {
    const restConfirm = confirm("Вы уверены, что хотите полноценный отдых?");
    if (restConfirm) {
      localStorage.setItem('character_data', JSON.stringify(mockCharacters));
      setCharacters(mockCharacters)
    }
  }

  function changeValue(characterId: number, key: keyof Character | 'armorBonus' | 'initiative') {

    const newValue = prompt("Введите изменение");

    if (!newValue) return;
    
    const updatedData = characters.map((character) => {
      if (character.id === characterId) {
        return { 
          ...character, 
          [key]: Number(newValue) 
        };
      }
      return character;
    });

    setCharacters(updatedData);
    localStorage.setItem('character_data', JSON.stringify(updatedData));
  }

  function changeAbilityValue(characterId: number, abilityKey: string) {
    const newValue = prompt("Введите изменение");
    if (!newValue) return;

    const updatedData = characters.map((character) => {
      if (character.id === characterId) {
        return {
          ...character,
          abilities: {
            ...character.abilities,
            [abilityKey]: Number(newValue)
          }
        };
      }
      return character;
    });

    setCharacters(updatedData);
    localStorage.setItem('character_data', JSON.stringify(updatedData));
  }

  return (
    <CharacterContext.Provider value={ {characters, setCharacters, getRest, changeValue, changeAbilityValue} }>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter(){
  const character = useContext(CharacterContext); 
  if (!character) {
    throw Error("useCharacter");
  }
  return character;
}