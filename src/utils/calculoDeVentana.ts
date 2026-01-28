const mixtoToDecimal = (entero: string, fraccion: string): number => {
  const numEntero = Number(entero) || 0;

  if (!fraccion || !fraccion.includes('/')) return numEntero;

  const [numerador, denominador] = fraccion.split('/');
  const numFraccion = Number(numerador) / (Number(denominador) || 1); // Evita división por 0

  return numEntero + numFraccion;
};


// const p65: Record<string, string> = {
//   rc: '1 3/8'
//   lateral: '1/8'
//   jamba:
//     ruleta:
//   can:
//     cal:
// }

// const tradicional: Record<string, string> = {
//   rc:
//     lateral:
//   jamba:
//     ruleta:
//   can:
//     cal:
// }

// const p92: Record<string, string> = {
//   rc:
//     lateral:
//   jamba:
//     ruleta:
//   can:
//     cal:
// }

export const calcularDesglose = (ancho: string, alto: string) => {
  mixtoToDecimal('10', '1/4')

  const desglose = {
    rc: ancho === '1' ? 'es 1' : 'no es',
    lateral: '20',
    jamba: '30',
    ruleta: '50',
    can: '1010',
    cal: '122'
  }
  return desglose
}