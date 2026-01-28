import { useEffect, useState } from 'react'
import type { TipoPerfil } from '../globalContext/useData'
import useData from '../globalContext/useData'
import Square from './Square'
import { useShallow } from 'zustand/shallow'
import { calcularDesglose } from '../utils/calculoDeVentana'

type Props = {
  id: number
}

export default function CalculoDesglose({ id }: Props) {
  const perfilSelected = useData(s => s.ventanaPerfilSelected)
  const { ancho, alto } = useData(
    useShallow((s) => {
      const v = perfilSelected ? s[perfilSelected].find(i => i.id === id) : null;
      return { etiqueta: v?.etiqueta, ancho: v?.ancho, alto: v?.alto };
    })
  );

  const { rc, lateral, jamba, ruleta, can, cal } = (ancho && alto)
    ? calcularDesglose(ancho, alto)
    : { rc: '', lateral: '', jamba: '', ruleta: '', can: '', cal: '' };
  console.log('Rerender', id);

  useEffect(() => {

  }, [ancho, alto])

  return (
    <div className='mt-2 flex flex-col gap-1'>
      <div className='flex justify-between items-center'>
        <Square value='Riel/Cabezal' />
        <Square value={rc} text={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Lateral' />
        <Square value={lateral} text={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Jamba' />
        <Square value={jamba} text={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Ruleta' />
        <Square value={ruleta} text={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Cristal Ancho' />
        <Square value={can} text={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Cristal Alto' />
        <Square value={cal} text={true} />
      </div>
    </div>
  )
}
