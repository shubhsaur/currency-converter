import { useState } from 'react'
import './App.css'
import CurrencyConverter from './components/CurrencyConverter'
import heroImage from '../public/hero.jpg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[url("../hero.jpg")] bg-cover flex items-center justify-center font-bold h-screen'>
      <CurrencyConverter />
    </div>
  )
}

export default App
