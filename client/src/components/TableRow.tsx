import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit';

import type { RowProps } from '../utilities/types';

const Row = ({ expense, removeRow, updateTable }: RowProps) => {

  return (
    <>
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

        <td className="flex items-center px-4 py-4 space-x-3 my-auto ">
          <ModalEdit updateTable={updateTable} expense={expense}/>
          <ModalDelete removeRow={removeRow} id={expense.id}/>

        </td>
      </tr>

      <tr>
        <td>

        </td>
      </tr>
    </>
  );
}

export default Row;