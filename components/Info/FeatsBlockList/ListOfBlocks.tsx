"use client"

import Block from "../Block/Block"
import Feat from "@/Types&Interfaces/Feat"
import "./ListOfBlocks.css"
import { useState, useEffect } from "react"
import { getFeats } from "@/lib/api/feats"

export default function ListOfBlocks() {
  const [data, setData] = useState <Feat[]> ([])

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getFeats();
        setData(data);
      } catch {
        console.log("Не удалось загрузить черты");
      } 
      // finally {
      //   setLoading(false)
      // }
    }

    loadCharacters();
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