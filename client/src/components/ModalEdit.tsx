import { useState, useContext } from 'react';
import axios from 'axios';

import IconEdit from '../assets/iconEdit';
import IconClose from '../assets/iconClose';

import type { ModalEditProps } from '../utilities/types'
import { CategoriesContext } from '../utilities/Context';

const ModalEdit = ({ updateTable, expense }: ModalEditProps) => {

  const [modalMode, setModalMode] = useState(false);
  const [form, setForm] = useState(
    { ...expense, ['date']: new Date('2023-' + expense.date).toISOString().split('T')[0] });


  const categories = useContext(CategoriesContext);

  const handleClickEdit: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setModalMode(true);
  }

  const handleClickMode: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalMode(!modalMode);
  }

  const handleChange: React.FormEventHandler<HTMLElement> = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // console.log('Form value', form);
    axios.put(`${import.meta.env.VITE_SERVER_URL}/expenses/${expense.id}`, form)
      .then(response => {
        // console.log('Put result: ', response.data)
        updateTable(response.data);
        setModalMode(false)
      })
  }

  return (
    <>
      <a href="#" onClick={handleClickEdit}
        className="font-medium text-blue-600 dark:text-blue-500">
        <IconEdit />
      </a>

      <div id="popup-modal" tabIndex={-1}
        className={`fixed z-50 ${modalMode ? "" : "hidden"}
      top-0 left-0 right-0 backdrop-blur-lg
      p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-5/6 max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <button type="button"
              onClick={handleClickMode}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
            rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
              <IconClose />
              <span className="sr-only">Close modal</span>
            </button>

            <form className="flex flex-col w-5/6 items-center space-y-4 p-4 m-auto">
              <h1 className="text-3xl font-bold">
                Update "{expense.name}" on {expense.date}
              </h1>

              <div className="flex justify-end items-center w-5/6">
                <label className="w-1/3 dark:text-gray-200" htmlFor="name">Expense</label>
                <input id="name" type="text" onChange={handleChange}
                  value={form.name || ''} required
                  className="w-full px-4 py-2 mt-2 text-gray-700
                bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300
                dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>


              <div className="flex justify-center items-center w-5/6">
                <label className="w-1/3 dark:text-gray-200" htmlFor="amount">Amount</label>
                <input id="amount" type="number" onChange={handleChange}
                  value={form.amount || ''} required
                  className="block w-full px-4 py-2 mt-2 text-gray-700
                 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300
                  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>

              <div className="flex justify-center items-center w-5/6">
                <label className="w-1/3 dark:text-gray-200" htmlFor="category">Category</label>
                <select id="category" onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
                 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
                  dark:focus:border-blue-500 focus:outline-none focus:ring">
                  {categories.map((category, idx) =>
                    <option key={idx}>{category}</option>)}
                </select>
              </div>
              <div className="flex justify-center items-center w-5/6">
                <label className="w-1/3 dark:text-gray-200" htmlFor="passwordConfirmation">Date</label>
                <input id="date" type="date" onChange={handleChange} required
                  value={form.date}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border
                 border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>
              <div className="flex justify-end w-5/6">
                <button type="button" onClick={handleClickMode}
                  className="text-white bg-gradient-to-r from-red-400
               via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5
                 py-2.5 text-center mr-2 mb-2">
                  Cancel</button>
                <button type="submit" onClick={handleSubmit}
                  className="text-white bg-gradient-to-r from-green-400
                 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4
                 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Save</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default ModalEdit;