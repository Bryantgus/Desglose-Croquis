import logo from '/Logo.svg'
import Btn from '../components/Btn'
import { useNavigate } from 'react-router-dom';
import useData, { type ventana } from '../globalContext/useData';
import ItemDesglose from '../components/ItemDesglose';
export default function EditarDesgloseView() {

  const store = useData();
  const { p65, tradicional, p92 } = useData()
  const perfilSelected = useData((s) => s.ventanaPerfilSelected);
  const ventanaData = perfilSelected ? store[perfilSelected] : [];
  const setVentanaPefil = useData(s => s.setVentanaPerfilSelected)

  const navigate = useNavigate();

  const setRoute = (route: string) => {
    navigate(route)
  }

  return (
    <div>

      {/*Header */}
      <div className='flex justify-between'>
        <div className="flex items-center gap-7">
          <h1 className="text-[36px] font-bold">Desglose</h1>
          <img src={logo} className='w-12 h-12' alt="Logo" />
        </div>

        <div className='flex gap-5'>
          <div onClick={() => setRoute('/')}>
            <Btn label={'Ver Ordenes'} />
          </div>
          <div onClick={() => setRoute('/editar-desglose')}>
            <Btn label={'Editar Desglose'} />
          </div>
          <div onClick={() => setRoute('/croquis')}>
            <Btn label={'Ver Croquis'} />
          </div>

        </div>
      </div>

      {/*Botones para seleccionar tipo de perfil */}
      <div className='flex gap-3 items-center'>
        <p className='text-2xl mt-4 font-semibold mb-3'>Seleccione el tipo de ventana</p>
        <div className='flex gap-5'>
          <div className="flex items-center" onMouseDown={() => setVentanaPefil('p65')}>
            <Btn
              label={'P65 ' + "(" + p65.length + ")"}
              color={perfilSelected === 'p65'}
              width={200} height={40}
            />
          </div>
          <div className="flex items-center" onMouseDown={() => setVentanaPefil('tradicional')} >
            <Btn
              label={'Tradicional ' + "(" + tradicional.length + ")"}
              color={perfilSelected === 'tradicional'} width={200} height={40} />
          </div>
          <div className="flex items-center" onMouseDown={() => setVentanaPefil('p92')}>
            <Btn
              label={'P92 ' + "(" + p92.length + ")"}
              color={perfilSelected === 'p92'} width={200} height={40} />
          </div>
        </div>
      </div>

      {/*Mapeando ventanas seleccionadas por perfil */}
      <div className='p-5 grid grid-cols-[auto_auto_auto_auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto_auto_auto_auto] lg:h-200 items-start justify-between gap-y-5 overflow-y-auto d:h-120 h-130 mt-3 border-sky-100 rounded-xl border-4'>

        {ventanaData.map((it: ventana) => {
          return (
            <ItemDesglose
              key={it.id}
              id={it.id}
              modeS={'ver'}
            />
          )
        })}
      </div>


    </div>
  )
}
