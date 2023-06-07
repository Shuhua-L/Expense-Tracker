import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Table from './components/Table';
import Form from './components/Form';
import type { Expense } from './types/types';

function App() {
  const [ text, setText ] = useState('Hello MVP!');
  const [ expenses, setExpenses ] = useState<Expense[]>([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER_URL}/`)
    .then((result) => setText(result.data))
    .catch(err => console.log('Error:', err));

    axios(`${import.meta.env.VITE_SERVER_URL}/expenses`)
    .then((result) => {
      console.log(result.data)
      setExpenses(result.data)
    })
    .catch(err => console.log('Error:', err));

  }, [])

  return (
    <>
     <h1 className="text-3xl font-bold">
    {text}
    </h1>
    <br />

    <Table expenses={expenses} />
    <br />
    <Form />
    </>
  )
}

export default App
