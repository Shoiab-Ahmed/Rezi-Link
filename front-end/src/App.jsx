import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard'
import Property from './Property'

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
{
  path : '/dashboard',
  element:<Dashboard/>
  },
{
  path : '/property/:id',
  element:<Property/>
  },

  
    ]
  )


  return (

   <RouterProvider router={ router }/>
  )
}

export default App
