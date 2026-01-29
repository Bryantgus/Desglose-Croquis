type Props = {
  label: string
  input: string
  setInput: (label: string, input: string) => void
  inputType?: string
  width?: number
}
export default function ItemMedida({ label, input, setInput, inputType = 'text', width = 80 }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="font-bold text-[15px]">{label}</label>
      <input id={label} type={inputType} className="h-8 bg-[#F5FDFF] rounded-xl font-bold text-center text-[15px] border border-[gray]"
        style={{ width }}
        value={input}
        onChange={(e) => setInput(label, e.target.value)} />
    </div>
  )
}
