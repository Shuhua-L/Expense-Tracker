type Expense = {
  id: number;
  name: string;
  date: string;
  amount: string;
  category: string;
}

interface TableProps {
  expenses: Expense[];
}

interface RowProps {
  expense: Expense;
}

interface FormProps {
  updateTable: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export type { Expense, TableProps, RowProps, FormProps }

