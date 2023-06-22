import { useState } from 'react';
import axios from 'axios';

import IconDelete from '../assets/iconDelete';
import IconClose from '../assets/iconClose';
import IconExclamation from '../assets/iconExclamation';

import type { ModalDeleteProps } from '../types/types'

const ModalDelete = ({ removeRow, id }: ModalDeleteProps ) => {

  const [modalMode, setModalMode] = useState(false);

  const handleClickDelete: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setModalMode(true);
  }

  const handleConfirmDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/expenses/${id}`)
      .then(() => {
        removeRow(id);
        setModalMode(false)
      })
      .catch(err => console.log(err))
  }

  const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalMode(false);
  }

  return (
    <>
     <a href="#" onClick={handleClickDelete}
            className="font-medium text-red-600 dark:text-red-500 hover:underline">
            <IconDelete />
          </a>

          <div id="popup-modal" tabIndex={-1}
            className={`fixed z-50 ${modalMode ? "" : "hidden"}
          top-0 left-0 right-0
          p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative w-full max-w-md max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                  onClick={handleClickClose}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                  <IconClose />
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <IconExclamation />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?</h3>
                  <button type="button" onClick={handleConfirmDelete}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none
                   focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center
                    px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                  </button>
                  <button type="button" onClick={handleClickClose}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none
                  focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5
                  hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
                  dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default ModalDelete;