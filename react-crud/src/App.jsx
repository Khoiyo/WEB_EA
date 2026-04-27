import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Gomb from './gomb'

function App() {
  const [count, setCount] = useState(0)
  const [nev, setNev] = useState('asdas')
  const asdasasdasd = "sadasdasd";
  return (
    <>
    <h1>{nev}</h1>
    <Gomb setCount={setCount}/>
    <input type="text" value={nev} onChange={(e)=>setNev(e.target.value)}/>
    </>
    
  )
}

export default App
