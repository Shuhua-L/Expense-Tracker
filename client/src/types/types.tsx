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

export type { Expense, TableProps, RowProps }

