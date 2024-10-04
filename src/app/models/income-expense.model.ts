export interface IncomeExpense {
    id: string;
    name: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    recurring: 'monthly' | 'one time';
  }