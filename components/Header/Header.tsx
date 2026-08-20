"use client"

import "./Header.css"
import { useRouter } from "next/navigation"

export default function Header () {

  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.textContent 
    switch (name) {
      case "Персонажи":
        router.push("/");   
        break;
      case "NPC":
        router.push("/NPC");   
        break;
      case "Бой":
        router.push("/Combat");   
        break;
      case "Черты":
        router.push("/Feats");   
        break;
      case "Снаряжение":
        router.push("/Equipment");   
        break;
      case "Оружие":
        router.push("/Weapons");   
        break;
    }
  }

  return (
    <div className="header">
      <ul className="header__list">
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>Персонажи</button></li>
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>NPC</button></li>
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>Бой</button></li>
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>Черты</button></li>
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>Снаряжение</button></li>
        <li><button className="header__button" onClick={(e) => handleNavigate(e)}>Оружие</button></li>
      </ul>
    </div>
  )
  /*const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <ul>
        <li><button onClick={() => handleNavigate("/")}>Персонажи</button></li>
        <li><button onClick={() => handleNavigate("/NPC")}>NPC</button></li>
        <li><button onClick={() => handleNavigate("/Combat")}>Бой</button></li>
        <li><button onClick={() => handleNavigate("/Feats")}>Черты</button></li>
      </ul>
    </div>
  );*/
}