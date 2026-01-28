export interface RegistroData {
  id: number;
  nombre: string;
  fecha: string;
}

const MOCK_REGISTROS: RegistroData[] = [
  { id: 1, nombre: 'Bryant Tejeda Florimon', fecha: '25 de Septiembre 2026' },
  { id: 2, nombre: 'Ana Martínez Sosa', fecha: '12 de Octubre 2026' },
  { id: 3, nombre: 'Carlos Ruiz Peña', fecha: '05 de Noviembre 2026' },
  { id: 4, nombre: 'Elena Gómez Peralta', fecha: '18 de Diciembre 2026' },
  { id: 5, nombre: 'Fernando Castro Gil', fecha: '10 de Enero 2027' },
  { id: 6, nombre: 'Gabriela Mejia Soler', fecha: '22 de Febrero 2027' },
  { id: 7, nombre: 'Hugo Valdez Rivas', fecha: '14 de Marzo 2027' },
  { id: 8, nombre: 'Isabel Torres Luna', fecha: '30 de Abril 2027' },
  { id: 9, nombre: 'Juan Pablo Duarte', fecha: '15 de Mayo 2027' },
  { id: 10, nombre: 'Karla Vega Ramos', fecha: '02 de Junio 2027' },
  { id: 11, nombre: 'Luis Fernando Mora', fecha: '19 de Julio 2027' },
  { id: 12, nombre: 'María José Almonte', fecha: '25 de Agosto 2027' },
  { id: 13, nombre: 'Nelson Ortega Díaz', fecha: '11 de Septiembre 2027' },
  { id: 14, nombre: 'Olga Salcedo Ruiz', fecha: '07 de Octubre 2027' },
  { id: 15, nombre: 'Pedro Infante Reyes', fecha: '20 de Noviembre 2027' }
];

export default MOCK_REGISTROS;