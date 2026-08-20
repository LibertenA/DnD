"use client"

import Block from "../Block/Block"
import Feat from "@/Types&Interfaces/Feat"
import "./ListOfBlocks.css"
import { mockFeats } from "@/mock-data/FeatsData"
import { useState, useEffect } from "react"

export default function ListOfBlocks() {
  const [data, setData] = useState <Feat[]> ([])

  useEffect(() => {
    setData(mockFeats);
  }, [])

  return (
    <section className="feats">
      <div className="block__feats">
        {data.map((feat) => (
          <Block
            key = {feat.id}
            data = {{...feat}}
            >
            <p className="block__effects">Специальное правило: {feat.specialRule}</p>
          </Block>  
        ))}
      </div>
    </section>
  )
}