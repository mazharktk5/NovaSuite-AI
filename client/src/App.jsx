import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'


const App = () => {
  return (
    <div>


      <Routes>
        <Route path="/" element={<HomeS />} />


      </Routes>


    </div>
  )
}

export default App
