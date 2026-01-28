import { useState } from "react";
import useData from "../globalContext/useData";
import ItemMedida from "./ItemMedida";
import CalculoDesglose from "./CalculoDesglose";
import { useShallow } from "zustand/shallow";

type Props = {
  id: number,
  modeS: 'editar' | 'ver'
}

export default function ItemDesglose({ id, modeS = 'editar' }: Props) {
  const [mode, setMode] = useState<'editar' | 'ver'>(modeS)
  const perfilSelected = useData(s => s.ventanaPerfilSelected)
  const { ancho, alto, etiqueta } = useData(
    useShallow((s) => {
      const v = perfilSelected ? s[perfilSelected].find(i => i.id === id) : null;
      return { etiqueta: v?.etiqueta, ancho: v?.ancho, alto: v?.alto };
    })
  );
  const setVentana = useData(s => s.setVentana)

  const setInput = (label: string, value: string) => {

    if (!perfilSelected) return;
    const propertyName = label.toLowerCase();
    console.log(label, value);
    setVentana(perfilSelected, id, { [propertyName]: value })
  }
  return (
    <div className="bg-[#e5f9fd] border border-[#474747] rounded-xl flex flex-col p-3 cursor-not-allowed">
      <ItemMedida label="Etiqueta" input={etiqueta!} setInput={setInput} />
      <div className="flex justify-between gap-2">
        <ItemMedida label="Ancho" input={ancho!} setInput={setInput} inputType="tel" />
        <ItemMedida label="Alto" input={alto!} setInput={setInput} inputType="tel" />
      </div>

      {modeS === 'ver' ?
        <CalculoDesglose id={id} />
        : <div>Hola</div>
      }

    </div>
  )
}
