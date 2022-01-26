import React from 'react';
import { useBudgets } from '../context/BudgetContext';
import BudgetCards from './BudgetCards';

export default function TotalBudgetCards() {
  const {expenses, budgets} = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)
  if (max === 0) return null
  console.log(max)

  return <BudgetCards 
  amount={amount} name="Total" gray hideButtons
  />
}


