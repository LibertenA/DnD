"use client"

import Block from "../Block/Block"
import Weapon from "@/Types&Interfaces/Weapon"
import "./ListOfBlocks.css"
import { mockWeapons } from "@/mock-data/WeaponData"
import { useState, useEffect } from "react"

export default function ListOfBlocks() {
  const [data, setData] = useState <Weapon[]> ([])

  useEffect(() => {
    setData(mockWeapons);
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