import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Table from './components/Table';
import Form from './components/Form';
// import Dictaphone from './components/Dictaphone';
import FormCreate from './components/FormCreate';

import type { Expense } from './utilities/types';
import { CategoriesContext } from './utilities/Context'

function App() {
  const [text, setText] = useState('SpeakSpend - Effortless Expense Tracking with AI');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState([]);

  const removeRow = (id: number) => {
    const filtered = expenses.filter(x => x.id != id);
    // console.log('Filtered: ', filtered)
    setExpenses(filtered)
  }

  useEffect(() => {
    // axios(`${import.meta.env.VITE_SERVER_URL}/`)
    //   .then((result) => setText(result.data))
    //   .catch(err => console.log('Error:', err));

    axios(`${import.meta.env.VITE_SERVER_URL}/expenses`)
      .then((result) => {
        // console.log(result.data)
        setExpenses(result.data)
      })
      .catch(err => console.log('Error:', err));

    axios.get(`${import.meta.env.VITE_SERVER_URL}/categories`)
      .then(response => {
        // console.log(response.data);
        setCategories(response.data)
      })
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
    <div className='container w-screen'>
      <h1 className="text-3xl font-bold">
        {text}
      </h1>
      <br />

      <div className='h-[65vh] space-x-3 m-auto'>
        <FormCreate updateTable={setExpenses}/>
        <Table expenses={expenses} removeRow={removeRow} updateTable={setExpenses} />
      </div>
      <br />
      <Form updateTable={setExpenses} />
      <br />

      {/* <Dictaphone /> */}
      <br />
    </div>
    </CategoriesContext.Provider >
  )
}

export default App
