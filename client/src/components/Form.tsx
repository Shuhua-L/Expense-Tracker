import { useState, useEffect } from "react";
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import type { FormProps } from "../types/types";
import IconMic from "../assets/iconMic";
import IconMute from "../assets/iconMute";
import IconSend from "../assets/iconSend";
import IconLoad from "../assets/iconLoad";
import IconReset from "../assets/iconReset";

const Form = ({ updateTable }: FormProps) => {

  const [loadingMode, setLoadingMode] = useState(false);
  const [query, setQuery] = useState("")

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    setQuery(transcript)
  }, [transcript])

  // const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    console.log(e.currentTarget.value)
    setQuery(e.currentTarget.value)
  }

  const handleClickMic: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (listening) {
      SpeechRecognition.stopListening()
      // .then(result => console.log(result))
      // .catch(err => console.log(err))
    } else {
      SpeechRecognition.startListening({ continuous: true })
      // .then(result => console.log(result))
      // .catch(err => console.log(err))
    }
  }

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = () => {
    resetTranscript();
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setLoadingMode(true);

    SpeechRecognition.stopListening()
      .then(result => console.log(result))
      .catch(err => console.log(err))

    if (query.length > 0) {
      console.log('sent: ', query)
      setQuery('');
      resetTranscript();

      axios.post(`${import.meta.env.VITE_SERVER_URL}/smart/expenses`, { query })
        .then((result) => {
          setLoadingMode(false);
          console.log('POST result: ', result.data)
          updateTable(result.data);

        })
        .catch(err => {
          setLoadingMode(false);
          console.log('Error:', err)
        });
    } else {
      setLoadingMode(false);
    }

  }

  return (
    <div className="relative ">
      <form className={`${loadingMode ? "blur-sm" : ""}`}>

        <label htmlFor="message" className="sr-only">User input message</label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">

          {browserSupportsSpeechRecognition && (
            <button type="button" onClick={handleClickMic}
              className={`p-2 ${listening ? "text-blue-500 animate-pulse dark:text-blue-600" : "text-gray-500"}
            rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100
             dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}>
              <IconMic />
              <span className="sr-only">Tab to Speak</span>
            </button>
          )}

          {browserSupportsSpeechRecognition || (
            <button type="button"
              className={`p-2 text-gray-500
           rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100
            dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}>
              <IconMute />
              <span className="sr-only">Browser does not support Web Speech API</span>
            </button>
          )}


          <textarea id="message" cols={1} placeholder="Tap the microphone icon or start typing here..."
            value={query} onChange={handleChange} required
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border
             border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"></textarea>

          <button type="button" onClick={handleReset}
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg
          cursor-pointer hover:text-blue-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <IconReset />
            <span className="sr-only">Reset message</span>
          </button>

          <button type="submit" onClick={handleSubmit}
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg
          cursor-pointer hover:text-blue-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <IconSend />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>

      <div role="status" className={`${loadingMode ? "" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`}>
        <IconLoad />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Form;