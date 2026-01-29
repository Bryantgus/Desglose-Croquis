import { useState } from "react";
import useData from "../globalContext/useData";
import ItemMedida from "./ItemMedida";
import CalculoDesglose from "./CalculoDesglose";
import { useShallow } from "zustand/shallow";
import config from '../assets/Icons/Settings.svg'
import back from '../assets/Icons/back.svg'
import { useLocation } from "react-router-dom";
import Caracteristicas from "./Caracteristicas";

type Props = {
  id: number,
  modeS: 'editar' | 'ver'
}

export default function ItemDesglose({ id, modeS = 'editar' }: Props) {
  const location = useLocation();
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
    if (mode === 'ver') return

    if (!perfilSelected) return;
    const propertyName = label.toLowerCase();
    console.log(label, value);
    setVentana(perfilSelected, id, { [propertyName]: value })
  }

  const switchMode = () => {
    setMode(mode === 'ver' ? 'editar' : 'ver')
  }
  return (
    <div className="bg-[#e5f9fd] border border-[#474747] rounded-xl flex flex-col p-2">
      <div className="flex items-center justify-between">
        <div className={`${modeS === 'ver' && 'cursor-not-allowed'}`}>
          <ItemMedida label="Etiqueta" input={etiqueta!} setInput={setInput} width={120} />
        </div>
        {location.pathname !== '/editar-desglose' &&
          <img src={modeS === 'editar' ? config : back} alt='settings' className="w-8 h-8 mt-6 cursor-pointer"
            onClick={switchMode} />}
      </div>
      <div className={`flex justify-between gap-2 ${modeS === 'ver' && 'cursor-not-allowed'}`}>
        <ItemMedida label="Ancho" input={ancho!} setInput={setInput} inputType="tel" />
        <ItemMedida label="Alto" input={alto!} setInput={setInput} inputType="tel" />
      </div>

      {modeS === 'ver' ?
        <CalculoDesglose id={id} />
        :
        <Caracteristicas id={id}/>
      }

    </div>
  )
}
