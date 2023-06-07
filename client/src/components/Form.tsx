import { useState } from "react";
import axios from 'axios';

import type { FormProps } from "../types/types";

const Form = ({ updateTable }: FormProps) => {

  const [loadingMode, setLoadingMode] = useState(false);
  const [query, setQuery] = useState("This morning, I bought a cup of coffee for $5 on my way to work.")

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value)
    setQuery(e.currentTarget.value)
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLoadingMode(true);
    console.log('sent: ', query)

    axios.post(`${import.meta.env.VITE_SERVER_URL}/smart/expenses`, { query })
    .then((result) => {
      setLoadingMode(false);
      console.log('POST result: ', result.data)
      updateTable(result.data);
      setQuery('');
    })
    .catch(err => {
      setLoadingMode(false);
      console.log('Error:', err)
      setQuery('');
    });
  }

  return (
    <div className="relative ">
      <form className={`${loadingMode ? "blur-sm" : ""}`}>

        <label htmlFor="message" className="sr-only">User input message</label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">

          <button type="button"
            className="p-2 text-gray-500 rounded-lg cursor-pointer
           hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400
            dark:hover:text-white dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
            </svg>
            <span className="sr-only">Tab to Speak</span>
          </button>

          <input id="message" type="text" placeholder="Tap the microphone icon or start typing here..."
          value={query} onChange={handleChange}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border
             border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500" >
          </input>

          <button type="submit" onClick={handleSubmit}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full
          cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>

      <div role="status" className={`${loadingMode ? "" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`}>
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Form;