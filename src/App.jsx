import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import { auth } from './firebase'
import SalasDisponibles from './components/SalasDisponibles'
import SalasReservadas from './components/SalasReservadas'

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  })

  return firebaseUser !== false ? (
    <Router>
      <div className='containerbase'>
        <Navbar firebaseUser={firebaseUser} />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='admin' element={<Admin />} />
          <Route path='salasdisponibles' element={<SalasDisponibles />} />
          <Route path='salasreservadas' element={<SalasReservadas />} />
        </Routes>
      </div>
    </Router>
  ) :
    (<p>Loading...</p>)
}

export default App
