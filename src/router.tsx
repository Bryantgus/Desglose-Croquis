import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
