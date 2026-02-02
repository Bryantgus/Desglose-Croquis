import { create } from 'zustand'
// import { MOCK_P65, MOCK_TRADICIONAL, MOCK_P92 } from '../mockData/DesgloseItem'

export type TipoPerfil = 'p65' | 'tradicional' | 'p92';
export type ColorPerfil = 'blanco' | 'negro' | 'caoba' | 'roble'
export type ColorCristal = 'Natural L' | 'Natural M' | 'Bronze L' | 'Bronze M'

export type ventana = {
  id: number
  etiqueta: string
  ancho: string
  alto: string
  caracteristicas: {
    tipoPerfil: TipoPerfil
    colorPerfil: string
    colorCristal: string
    rieles: number
  }
}

type DataState = {
  idSelected: number
  p65: ventana[]
  tradicional: ventana[]
  p92: ventana[]
  ventanaPerfilSelected: TipoPerfil | null
  setId: (id: number) => void
  setVentana: (perfil: keyof Pick<DataState, 'p65' | 'tradicional' | 'p92'>, id: number, newData: Partial<ventana>) => void
  setVentanaPerfilSelected: (perfil: TipoPerfil) => void
  addVentana: (perfil: TipoPerfil, cantidad: number) => void
}


const useData = create<DataState>((set) => ({
  idSelected: -1,

  p65: [],
  tradicional: [],
  p92: [],

  // p65: MOCK_P65,
  // tradicional: MOCK_TRADICIONAL,
  // p92: MOCK_P92,

  ventanaPerfilSelected: null,

  setId: (id) => set({ idSelected: id }),

  setVentana: (perfil, id, newData) => {
    set((state) => ({
      [perfil]: state[perfil].map((v) =>
        v.id === id ? { ...v, ...newData } : v
      )
    }))
  },

  setVentanaPerfilSelected: (perfil) => {
    set(() => ({
      ventanaPerfilSelected: perfil
    }))
  },
  addVentana: (perfil, cantidad) => {
    set((state) => {
      const currentArray = state[perfil]; // ← Aquí selecciona el array correcto
      const lastId = currentArray.length > 0
        ? Math.max(...currentArray.map(v => v.id))
        : 0;

      const newVentanas: ventana[] = Array.from({ length: cantidad }, (_, i) => ({
        id: lastId + i + 1,
        etiqueta: `V-${lastId + i + 1}`,
        ancho: '',
        alto: '',
        caracteristicas: {
          tipoPerfil: perfil, // ← También asigna el tipo correcto
          colorPerfil: 'blanco',
          colorCristal: 'Natural L',
          rieles: 2
        }
      }));

      return {
        [perfil]: [...currentArray, ...newVentanas] // ← Actualiza solo el array correspondiente
      };
    });
  }

}))

export default useData;

