type Props = {
  label: string
  width?: number
  height?: number
  bg?: boolean
}
export default function Btn({ width = 250, height = 80, label, bg }: Props) {
  return (
    <button className="font-semibold text-xl  bg-[#E6FAFF] rounded-2xl cursor-pointer border border-gray-300 hover:bg-sky-100"
      style={{ width, height, backgroundColor: bg ? '#3333' : '#E6FAFF' }}
    >
      {label}
    </button>
  )
}
