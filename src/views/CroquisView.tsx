import logo from '/Logo.svg'
import Btn from '../components/Btn'
import { useNavigate } from 'react-router-dom';
export default function VerDesgloseView() {
  
  const navigate = useNavigate();

  const setRoute = (route: string) => {
    navigate(route)
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div className="flex items-center gap-7">
          <h1 className="text-[36px] font-bold">Croquis</h1>
          <img src={logo} className='w-12 h-12' alt="Logo" />
        </div>

        <div className='flex gap-5'>  
          <div onClick={() => setRoute('/')}>
            <Btn label={'Ver Ordenes'} />
          </div>
          <div onClick={() => setRoute('/editar-desglose')}>
            <Btn label={'Editar Desglose'} />
          </div>
          <div onClick={() => setRoute('/ver-desglose')}>
            <Btn label={'Ver Desglose'} />
          </div>

        </div>
      </div>
      <p className='text-2xl mt-4 font-semibold'>Registro de Desgloses/Croquis guardados</p>
    </div>
  )
}
