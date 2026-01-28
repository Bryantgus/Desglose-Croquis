type Props = {
  label: string
  input: string
  setInput: (label: string, input: string) => void
  inputType?: string
}
export default function ItemMedida({ label, input, setInput, inputType = 'text' }: Props) {
  return (
    <div className="flex flex-col gap-1 cursor-not-allowed">
      <label htmlFor={label} className="font-semibold text-xl cursor-not-allowed">{label}</label>
      <input type={inputType} className="w-25 h-8 bg-[#F5FDFF] rounded-xl font-bold text-center text-xl border border-[gray] cursor-not-allowed" 
      value={input} 
      onChange={(e) => setInput(label, e.target.value)} />
    </div>
  )
}
