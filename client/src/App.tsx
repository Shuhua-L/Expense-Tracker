import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [ text, setText ] = useState('Hello MVP!');

  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER_URL}/`)
    .then((result) => setText(result.data))
    .catch(err => console.log('Error:', err))
  })

  return (
    <>
     <h1 className="text-3xl font-bold underline">
    {text}
    </h1>
    </>
  )
}

export default App
