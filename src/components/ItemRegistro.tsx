import number from '../assets/Icons/Number.svg'
import user from '../assets/Icons/User.svg'
import fecha from '../assets/Icons/Date.svg'

const imgSelected = {
  number, user, fecha
}

type Props = {
  img: keyof typeof imgSelected
  label: string
  width: number
}

export default function ItemRegistro({ img, label, width }: Props) {
  return (
    <div className='flex items-center gap-3 ' style={{ width }}>
      <img src={imgSelected[img]} className='w-10 h-10 rounded-xl' alt="icon" />
      <p className='text-[20px] font-semibold'>{label}</p>

    </div>
  )
}
