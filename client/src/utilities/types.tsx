type Expense = {
  id: number;
  name: string;
  date: string;
  amount: string;
  category: string;
}

interface TableProps {
  expenses: Expense[];
  removeRow: (id: number) => void;
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface RowProps {
  expense: Expense;
  removeRow: (id: number) => void;
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface FormProps {
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface ModalCreate {
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface ModalDeleteProps {
  id: number,
  removeRow: (id: number) => void;
}

interface ModalEditProps {
  expense: Expense,
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export type { Expense, TableProps, RowProps, FormProps, ModalCreate, ModalDeleteProps, ModalEditProps }

