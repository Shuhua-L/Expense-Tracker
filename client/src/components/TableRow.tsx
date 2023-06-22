
import IconEdit from '../assets/iconEdit';
import type { RowProps } from '../types/types';


import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit';

const Row = ({ expense, removeRow, updateTable }: RowProps) => {

  // const [modalMode, setModalMode] = useState(false);

  const handleClickEdit: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
  }

  // const handleClickDelete: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
  //   e.preventDefault();
  //   setModalMode(true);
  // }

  // const handleConfirmDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
  //   axios.delete(`${import.meta.env.VITE_SERVER_URL}/expenses/${expense.id}`)
  //     .then(() => {
  //       removeRow(expense.id);
  //       setModalMode(false)
  //     })
  //     .catch(err => console.log(err))
  // }

  // const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
  //   setModalMode(false);
  // }

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
          {/* <a href="#" onClick={handleClickEdit}
            className="font-medium text-blue-600 dark:text-blue-500">
            <IconEdit />
          </a> */}
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