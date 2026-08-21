"use client"

import Block from "../Block/Block"
import Equipment from "@/Types&Interfaces/Equipment"
import "./ListOfBlocks.css"
import { mockEquipment } from "@/mock-data/EquipmentData"
import { useState, useEffect } from "react"
import { getEquipment } from "@/lib/api/equipment"

export default function ListOfBlocks() {
  const [data, setData] = useState <Equipment[]> ([])

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getEquipment();
        setData(data);
      } catch {
        console.log("Не удалось загрузить снаряжение");
      } 
      // finally {
      //   setLoading(false)
      // }
    }

    loadCharacters();
  }, [])

  return (
    <section className="equipment">
      <div className="block__equipment">
        {data.map((equipment) => (
          <Block
            key = {equipment.id}
            data = {{...equipment}}
          />  
        ))}
      </div>
    </section>
  )
}