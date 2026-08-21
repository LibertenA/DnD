"use client"

import Block from "../Block/Block"
import Weapon from "@/Types&Interfaces/Weapon"
import "./ListOfBlocks.css"
import { useState, useEffect } from "react"
import { getWeapons } from "@/lib/api/weapons"

export default function ListOfBlocks() {
  const [data, setData] = useState <Weapon[]> ([])

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getWeapons();
        setData(data);
      } catch {
        console.log("Не удалось загрузить оружие");
      } 
      // finally {
      //   setLoading(false)
      // }
    }

    loadCharacters();
  }, [])

  return (
    <section className="weapons">
      <div className="block__weapons">
        {data.map((weapon) => (
          <Block
            key = {weapon.id}
            data = {{...weapon}}
          />  
        ))}
      </div>
    </section>
  )
}