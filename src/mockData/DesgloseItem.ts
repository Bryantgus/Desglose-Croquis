import type { ventana } from "../globalContext/useData";

export const MOCK_TRADICIONAL: ventana[] = [
  {
    id: 4,
    etiqueta: "Baño 1",
    ancho: "39 3/8",
    alto: "47 1/4",
    caracteristicas: {
      tipoPerfil: 'tradicional',
      colorPerfil: "blanco",
      colorCristal: 'Natural L',
      rieles: 2
    }
  }
]

export const MOCK_P92: ventana[] = [
  {
    id: 16,
    etiqueta: "Baño 1",
    ancho: "94 1/2",
    alto: "82 11/16",
    caracteristicas: {
      tipoPerfil: 'p92',
      colorPerfil: "roble",
      colorCristal: 'Bronze L',
      rieles: 2
    }
  }
];

export const MOCK_P65: ventana[] = [
  {
    id: 1,
    etiqueta: "Baño 1",
    ancho: "47 1/4",
    alto: "39 3/8",
    caracteristicas: {
      tipoPerfil: 'p65',
      colorPerfil: "caoba",
      colorCristal: 'Natural M',
      rieles: 2
    }
  },
  {
    id: 2,
    etiqueta: "Baño 1",
    ancho: "47 1/4",
    alto: "39 3/8",
    caracteristicas: {
      tipoPerfil: 'p65',
      colorPerfil: "negro",
      colorCristal: 'Natural M',
      rieles: 2
    }
  }
];