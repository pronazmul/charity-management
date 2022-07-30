import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import HomeScreen from './components/screens/HomeScreen'
import LoginScreen from './components/screens/LoginScreen'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomeScreen />} />
      </Route>
      <Route path='/login' element={<LoginScreen />} />
    </Routes>
  )
}

export default App
