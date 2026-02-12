import useData, { type ColorPerfil } from "../globalContext/useData"
import { useState } from "react"

type Props = {
  id: number
}

type ColoresPerfilOptionsType = {
  value: ColorPerfil
  color: string
  label: string
}

export default function Caracteristicas({ id }: Props) {
  const perfilSelected = useData(s => s.ventanaPerfilSelected)
  const [showColorPerfil, setShowColorPerfil] = useState(false)
  const [showTipoCristal, setShowTipoCristal] = useState(false)
  const [showVias, setShowVias] = useState(false)

  const ventana = useData(s =>
    perfilSelected ? s[perfilSelected].find(v => v.id === id) : null
  )
  const setVentana = useData(s => s.setVentana)

  if (!ventana) return null

  const { colorPerfil, colorCristal, vias } = ventana.caracteristicas

  const coloresPerfilOptions: ColoresPerfilOptionsType[] = [
    { value: 'blanco', color: 'white', label: 'Blanco' },
    { value: 'negro', color: 'black', label: 'Negro' },
    { value: 'caoba', color: '#3a2722', label: 'Caoba' },
    { value: 'roble', color: '#6b4423', label: 'Roble' }
  ]

  const tiposCristalOptions = ['Natural L.', 'Natural M.', 'Bronze L.', 'Bronze M.']
  const viasOptions = ['2V', '3V']

  const colorPerfilFormated: string = colorPerfil === 'blanco' ? 'white' :
    colorPerfil === 'negro' ? 'black' :
      colorPerfil === 'caoba' ? '#3a2722' :
        colorPerfil === 'roble' ? '#6b4423' : ''

  const handleColorPerfilChange = (newColor: ColorPerfil) => {
    setVentana(perfilSelected!, id, {
      ...ventana,
      caracteristicas: {
        ...ventana.caracteristicas,
        colorPerfil: newColor
      }
    })
    setShowColorPerfil(false)
  }

  const handleTipoCristalChange = (newTipo: string) => {
    setVentana(perfilSelected!, id, {
      ...ventana,
      caracteristicas: {
        ...ventana.caracteristicas,
        colorCristal: newTipo
      }
    })
    setShowTipoCristal(false)
  }

  const handleViasChange = (newVias: string) => {
    setVentana(perfilSelected!, id, {
      ...ventana,
      caracteristicas: {
        ...ventana.caracteristicas,
        vias: newVias
      }
    })
    setShowVias(false)  
  }

  const toggleColorPerfil = () => {
    setShowColorPerfil(!showColorPerfil)
    setShowTipoCristal(false)
    setShowVias(false)
  }

  const toggleTipoCristal = () => {
    setShowTipoCristal(!showTipoCristal)
    setShowColorPerfil(false)
    setShowVias(false)
  }

  const toggleVias = () => {
    setShowVias(!showVias)
    setShowColorPerfil(false)
    setShowTipoCristal(false)
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      {/* Color Perfil */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="font-bold text-[15px]">Color Perfil: </p>
        </div>
        <div className="w-[83.09px] flex justify-center relative">
          <div
            className="w-15 h-5 rounded-sm border-2 border-[#474747] cursor-pointer"
            style={{ backgroundColor: colorPerfilFormated }}
            onClick={toggleColorPerfil}
          />
          
          {showColorPerfil && (
            <div className="absolute top-7 right-0 bg-white border-2 border-[#474747] rounded-md shadow-lg z-10 p-2 flex flex-col gap-1">
              {coloresPerfilOptions.map(option => (
                <div
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  onClick={() => handleColorPerfilChange(option.value)}
                >
                  <div
                    className="w-6 h-6 rounded-sm border-2 border-[#474747]"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-sm whitespace-nowrap">{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tipo Cristal */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="font-bold text-[15px]">Tipo Cristal: </p>
        </div>
        <div className="w-[83.09px] flex justify-center relative">
          <p 
            className="font-black border border-[#474747] rounded-sm text-[12px] p-1 cursor-pointer"
            onClick={toggleTipoCristal}
          >
            {colorCristal}
          </p>
          
          {showTipoCristal && (
            <div className="absolute top-7 right-0 bg-white border-2 border-[#474747] rounded-md shadow-lg z-10 min-w-25">
              {tiposCristalOptions.map(tipo => (
                <div
                  key={tipo}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  onClick={() => handleTipoCristalChange(tipo)}
                >
                  {tipo}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vías */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="font-bold text-[15px]">Vías: </p>
        </div>
        <div className="w-[83.09px] flex justify-center relative">
          <p 
            className="font-black border border-[#474747] rounded-sm text-[12px] p-1 cursor-pointer"
            onClick={toggleVias}
          >
            {vias}
          </p>
          
          {showVias && (
            <div className="absolute top-7 right-0 bg-white border-2 border-[#474747] rounded-md shadow-lg z-10 min-w-16">
              {viasOptions.map(via => (
                <div
                  key={via}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-center"
                  onClick={() => handleViasChange(via)}
                >
                  {via}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}