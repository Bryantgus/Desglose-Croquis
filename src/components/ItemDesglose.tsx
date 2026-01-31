import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(mode);

  }, [mode])
  const switchMode = () => {
    const toggleMode = mode === 'ver' ? 'editar' : 'ver'
    setMode(toggleMode)
  }
  return (
    <div className="bg-[#e5f9fd] border border-[#474747] rounded-xl flex flex-col p-2 justify-between">
      <div className="flex items-center justify-between">
        <div className="flex ">

          <div className={`${modeS === 'ver' && 'cursor-not-allowed'}`}>
            <ItemMedida label="Etiqueta" input={etiqueta!} setInput={setInput} width={110} />
          </div>

          <div className="flex flex-col items-center justify-start">

            <p className={`mb-1 text-[13px] text-black font-black ${mode === 'editar' ? 'text-black' : 'text-[#e5f9fd]'}`}>P:[] C: []</p>

            {location.pathname !== '/editar-desglose' &&
              <img src={mode === 'editar' ? back : config} alt='settings' className="w-8 h-8 cursor-pointer"
                onClick={switchMode} />}
          </div>
        </div>
      </div>
      <div className={`flex justify-between gap-2`}>
        <ItemMedida label="Ancho" input={ancho!} setInput={setInput} inputType="tel" />
        <ItemMedida label="Alto" input={alto!} setInput={setInput} inputType="tel" />
      </div>

      {mode === 'ver' ?
        <CalculoDesglose id={id} />
        :
        <Caracteristicas id={id} />
      }

    </div>
  )
}
