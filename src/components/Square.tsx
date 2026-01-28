
type Props = {
  value: string
  text?: boolean
}
export default function Square({ value, text }: Props) {
  return (
    <div className={`w-25 h-9 bg-[#F5FDFF] rounded-xl font-black text-center ${text ? 'text-[18px]' : 'text-[14px]'} border border-[gray] flex items-center justify-center`}>
      {value}
      </div>
  )
} 
