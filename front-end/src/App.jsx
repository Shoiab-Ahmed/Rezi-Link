import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setusername] = useState('')

  useEffect(() => {
    console.log('adnan')
  
    
  }, [count])
  


  return (

    <>
    <form>
      <input value={username} on type="text"  />
      <input type="text" />
    </form>
     
    </>
  )
}

export default App
