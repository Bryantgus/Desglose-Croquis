import logo from '../../public/Logo.svg'
import fecha from '../assets/Icons/Date.svg'
import up from '../assets/Icons/Up.svg'
import down from '../assets/Icons/Down.svg'
import Registro from './Registro'
import MOCK_REGISTROS, { type RegistroData } from '../mockData/Registro'
import { useEffect, useState } from 'react'
import Btn from './Btn'


export default function MainPage() {

  const [idSelected, setIdSelected] = useState<number | null>(null)
  const [labelError, setLabelError] = useState(false)
  const setId = (id: number) => {
    setIdSelected(id)
  }
  useEffect(() => {
    console.log(idSelected);
  }, [idSelected])

  return (
    <div className="text-[#323232] p-4">
      <div className="flex items-center gap-7">
        <h1 className="text-[36px] font-bold">Desglose/Croquis</h1>
        <img src={logo} className='w-12 h-12' alt="Logo" />
      </div>

      <p className='text-2xl mt-4 font-semibold'>Registro de Desgloses/Croquis guardados</p>

      <div className='flex items-center'>

        <div className='d:w-[50%] w-[60%]'>

          <div className='flex items-center w-fit mt-4 gap-5'>
            <input type="text" className='text-xl pl-5 border border-[#787878] w-75 h-12 bg-[#E6FAFE] rounded-xl' placeholder='Buscar por nombre' />
            <div className='p-1 cursor-pointer flex gap-2 items-center bg-[#E6FAFE] rounded-xl w-35 justify-center border border-[#787878]'>
              <img src={up} alt="fecha" className='w-10 h-10 rounded-xl' />
              <img src={fecha} alt="fecha" className='w-10 h-10 rounded-xl' />
            </div>
          </div>

          <div className='mt-5 p-3 border-2 border-[#c9edf7] rounded-xl gap-3 flex flex-col overflow-y-auto h-105 d:h-129'>
            {MOCK_REGISTROS.map((it: RegistroData) => {
              return (
                <Registro
                  key={it.id}
                  id={it.id}
                  nombre={it.nombre}
                  fecha={it.fecha}
                  seleccionado={setId}
                  isSelected={idSelected === it.id} />
              )
            })}
          </div>
        </div>
        <div className='flex flex-col w-[40%] d:-[50%] justify-center items-center gap-5'>
          <Btn label={'Crear Nuevo Desglose'} />
          <div onClick={() => {
            if (!idSelected) {
              setLabelError(true)
            }
          }}>
            <Btn bg={idSelected ? false : true} label={'Abrir Desglose'} />
            {labelError && !idSelected &&
              <p className='mt-3 text-red-400 text-[17px] text-center'>Selecciona un registro para abrir</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
