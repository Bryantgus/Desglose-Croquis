import useData from "../globalContext/useData"

type Props = {
  id: number
}
export default function Caracteristicas({ id }: Props) {
  const perfilSelected = useData(s => s.ventanaPerfilSelected)
  
  const ventana = useData(s => 
    perfilSelected ? s[perfilSelected].find(v => v.id === id) : null
  )
  const setVentana = useData(s => s.setVentana);

  if (!ventana) return null;

  const { colorPerfil, colorCristal } = ventana.caracteristicas;
  const colorPerfilFormated = colorPerfil === 'blanco' ? 'white' :
  colorPerfil === 'negro' ? 'black' : 
  colorPerfil === 'caoba' ? '#3a2722 ' :
  colorPerfil === 'roble' ? '	#6b4423' : ''


  return (
    <div className="flex flex-col gap-2 mt-3">
      {/* Color Perfil */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="font-bold text-[15px]">Color Perfil: </p>
        </div>
        <div className="w-[83.09px] flex justify-center">
          <div 
            className="w-15 h-5 rounded-sm border-2 border-[#474747] cursor-pointer" 
            style={{ backgroundColor: colorPerfilFormated }} 
          />
        </div>
      </div>

      {/* Tipo Cristal */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="font-bold text-[15px]">Tipo Cristal: </p>
        </div>
        <div className="w-[83.09px] flex justify-center">
          <p className="font-black border border-[#474747] rounded-sm text-[12px] p-1 cursor-pointer">
            {colorCristal}
          </p>
        </div>
      </div>
    </div>
  )
}