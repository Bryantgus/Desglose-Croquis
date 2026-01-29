import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistroView from './views/RegistroView'
import VerDesgloseView from './views/VerDesgloseView';
import EditarDesgloseView from './views/EditarDesgloseView';
import CroquisView from './views/CroquisView';
import './index.css'
const width = window.innerWidth;
const height = window.innerHeight;
export default function Router() {
  return (
    <div className='relative text-[#323232] p-5'>

      <div className='font-black absolute top-10 left-100'>
        {width}x
        {height}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegistroView />} />
          <Route path='/editar-desglose' element={<EditarDesgloseView />} />
          <Route path='/ver-desglose' element={<VerDesgloseView />} />
          <Route path='/croquis' element={<CroquisView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
