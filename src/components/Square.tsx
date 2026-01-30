
type Props = {
  value: string
  text?: boolean
  black?: boolean
}
export default function Square({ value, text, black }: Props) {
  return (
    <div className={`w-20 h-8 bg-[#F5FDFF] rounded-xl ${black ? 'font-black' : 'font-bold'} text-center ${text ? 'text-[16px]' : 'text-[15px]'} border border-[gray] flex items-center justify-center`}>
      {value}
    </div>
  )
} 
