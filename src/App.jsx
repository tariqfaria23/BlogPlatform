import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home, Login, CreatePost } from './pages/index'
import Navbar from './components/Navbar'
import { useState } from 'react';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />}/>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
