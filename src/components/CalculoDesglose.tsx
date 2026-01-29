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
    ? calcularDesglose(ancho, alto, '2v', perfilSelected!)
    : { rc: '', lateral: '', jamba: '', ruleta: '', can: '', cal: '' };

  useEffect(() => {

  }, [ancho, alto])

  return (
    <div className='mt-2 flex flex-col gap-1 '>
      <div className='flex justify-between items-center'>
        <Square value='RC' />
        <Square value={rc} text={true} black={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Lateral' />
        <Square value={lateral} text={true} black={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Jamba' />
        <Square value={jamba} text={true} black={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Ruleta' />
        <Square value={ruleta} text={true} black={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Can' />
        <Square value={can} text={true} black={true} />
      </div>

      <div className='flex justify-between items-center'>
        <Square value='Cal' />
        <Square value={cal} text={true} black={true} />
      </div>
    </div>
  )
}
