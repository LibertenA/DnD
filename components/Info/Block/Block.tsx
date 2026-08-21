import "./Block.css"
import BaseInterface from "@/Types&Interfaces/BaseInterface";

type BlockProps = {
  data: BaseInterface;
  children?: React.ReactNode;
}

export default function Block ({ data, children }: BlockProps) {
  return (
    <div className="block">
      <h3 className="block__title">{data.name}</h3>
      <p className="block__description">Описание: {data.description}</p>

      {children}
    </div>
  )
}