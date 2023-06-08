
import type { RowProps } from '../types/types';

const Row = ({ expense }: RowProps) => {

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-2 font-medium text-gray-900  dark:text-white">
        {expense.name}
      </th>
      <td className="px-6 py-2 text-center">
        {expense.category}
      </td>
      <td className="px-6 py-4 text-center">
        {expense.amount}
      </td>
      <td className="px-6 py-4 text-center">
        {expense.date}
      </td>
{/*
      <td className="flex items-center px-4 py-4 space-x-3 my-auto ">
        <a href='#' className="font-medium text-blue-600 dark:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="currentColor" viewBox="0 0 512 512">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9
              21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6
              18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3
              172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0
              96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7
              0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
          </svg>
        </a>
        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" fill="currentColor" viewBox="0 0 418 512">
            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7
          3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80
          80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80
          93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0
          17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16
          16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16
          16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16
          16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
          </svg>
        </a>
      </td> */}
    </tr>
  );
}

export default Row;