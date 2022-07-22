import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Main from './components/Main'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main' element={<Main/>} />
      </Routes>
    </BrowserRouter>
  )
}
