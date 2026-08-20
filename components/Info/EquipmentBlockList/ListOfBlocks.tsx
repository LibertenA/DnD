"use client"

import Block from "../Block/Block"
import Equipment from "@/Types&Interfaces/Equipment"
import "./ListOfBlocks.css"
import { mockEquipment } from "@/mock-data/EquipmentData"
import { useState, useEffect } from "react"

export default function ListOfBlocks() {
  const [data, setData] = useState <Equipment[]> ([])

  useEffect(() => {
    setData(mockEquipment);
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