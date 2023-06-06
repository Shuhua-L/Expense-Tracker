type Expense = {
  id: number;
  name: string;
  date: string;
  amount: string;
  category: number;
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  expenses: Expense[];
}

interface RowProps {
  expense: Expense;
}

export type { Expense, TableProps, RowProps }

