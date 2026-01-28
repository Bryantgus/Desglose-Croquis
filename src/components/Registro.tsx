import ItemRegistro from "./ItemRegistro";
type Props = {
  id: number
  nombre: string
  fecha: string
  seleccionado: (id: number) => void
  isSelected: boolean
}

export default function Registro({ id, nombre, fecha, isSelected, seleccionado }: Props) {
  console.log(isSelected);

  return (
    <div className={`
        flex gap-3 items-center rounded-xl p-2 py-7 cursor-pointer transition-colors duration-200
        shadow-xs shadow-[#3333]
        ${isSelected
        ? 'bg-[#BAE5ED]'
        : 'bg-[#E6FAFE] hover:bg-sky-100'
      }
      `}
      onMouseDown={() => seleccionado(id)}
    >
      <ItemRegistro img={"number"} label={id.toString()} width={150} />
      <ItemRegistro img={"user"} label={nombre} width={500} />
      <ItemRegistro img={"fecha"} label={fecha} width={500} />
    </div>
  )
}
