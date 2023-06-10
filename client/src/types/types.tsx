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
}

interface RowProps {
  expense: Expense;
  removeRow: (id: number) => void;
}

interface FormProps {
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export type { Expense, TableProps, RowProps, FormProps }

