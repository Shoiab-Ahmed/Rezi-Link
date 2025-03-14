import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Login from './Login'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

function App() {
  


  const router = createBrowserRouter(
  [
{
  path: '/',
  element: <Home />,
},
{
path : '/login',
element:<Login/>
}
  
    ]
  )


  return (

   <RouterProvider router={ router }/>
  )
}

export default App
