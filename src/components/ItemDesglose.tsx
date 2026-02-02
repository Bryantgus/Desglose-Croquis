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
  const { ancho, alto, etiqueta, caracteristicas } = useData(
    useShallow((s) => {
      const v = perfilSelected ? s[perfilSelected].find(i => i.id === id) : null;
      return {
        etiqueta: v?.etiqueta,
        ancho: v?.ancho,
        alto: v?.alto,
        caracteristicas: v?.caracteristicas
      };
    })
  );

  const perfil = caracteristicas?.colorPerfil === 'blanco' ? 'B' :
    caracteristicas?.colorPerfil === 'negro' ? 'N' :
      caracteristicas?.colorPerfil === 'caoba' ? 'C' :
        caracteristicas?.colorPerfil === 'roble' ? 'R'
          : ''

  const cristal = caracteristicas?.colorCristal === 'Natural L' ? 'NL' :
    caracteristicas?.colorCristal === 'Natural M' ? 'NM' :
      caracteristicas?.colorCristal === 'Bronze L' ? 'BL' :
        caracteristicas?.colorCristal === 'Bronze M' ? 'BM'
          : ''

  const setVentana = useData(s => s.setVentana)

  // Regex para validar medidas completas en pulgadas
  const validateMedida = (value: string): boolean => {
    const regex = /^\d+(\s(1|3|5|7|9|11|13|15)\/16|\s(1|3|5|7)\/8|\s(1|3)\/4|\s1\/2)?$/;
    console.log('Validando:', value, 'Resultado:', regex.test(value));
    return regex.test(value);
  }

  // Regex más permisivo para permitir escribir mientras se teclea
  const isValidWhileTyping = (value: string): boolean => {
    // Permite: números, UN solo espacio máximo, /, y vacío
    // NO permite doble espacio ni espacio al inicio
    const typingRegex = /^(\d+(\s(\d+)?(\/(\d+)?)?)?)?$/;

    // Validación adicional: no permitir doble espacio
    if (value.includes('  ')) return false;

    return typingRegex.test(value);
  }

  const setInput = (label: string, value: string) => {
    if (mode === 'ver') return
    if (!perfilSelected) return;

    const propertyName = label.toLowerCase();

    // Para etiqueta, actualizar directamente
    if (label === 'Etiqueta') {
      setVentana(perfilSelected, id, { [propertyName]: value })
      return;
    }

    // Para medidas (Ancho/Alto)
    // Permitir escribir si está en proceso de escritura
    if (isValidWhileTyping(value) || value === '') {
      setVentana(perfilSelected, id, { [propertyName]: value })
    }
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

            <p className={`mb-1 text-[13px] font-black ${mode === 'editar' ? 'text-[#e5f9fd]' : 'text-black'}`}>P:[{perfil}] C:[{cristal}]</p>

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

      {/* Indicador visual de validación (opcional) */}
      {mode === 'editar' && ancho && !validateMedida(ancho) && (
        <p className="text-red-500 text-xs mt-1">⚠️ Formato de ancho inválido</p>
      )}
      {mode === 'editar' && alto && !validateMedida(alto) && (
        <p className="text-red-500 text-xs mt-1">⚠️ Formato de alto inválido</p>
      )}
    </div>
  )
}