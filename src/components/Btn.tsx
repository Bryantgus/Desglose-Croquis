type Props = {
  label: string
  width?: number
  height?: number
  bg?: boolean
  color?: boolean
}
export default function Btn({ width = 250, height = 50, label, bg, color }: Props) {
  return (
    <button className={`font-semibold text-xl  ${bg ? 'bg-gray-300' : 'bg-sky-200'} rounded-2xl cursor-pointer border border-gray-300 hover:bg-sky-300 ${color && 'bg-sky-400'}`}
      style={{ width, height }}
    >
      {label}
    </button>
  )
}
