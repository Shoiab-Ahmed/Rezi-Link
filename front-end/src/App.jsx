import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
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
},
{
path : '/signup',
element:<Signup/>
},

  
    ]
  )


  return (

   <RouterProvider router={ router }/>
  )
}

export default App
