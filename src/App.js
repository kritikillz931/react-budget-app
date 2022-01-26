import { Button, Container, Stack } from 'react-bootstrap';
import './App.css';
import BudgetCards from '../src/components/BudgetCards.js'
import AddBudgetModal from "../src/components/addBudgetModal.js"
import { useState } from 'react';
import { useBudgets } from './context/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCards from "./components/UncategorizedBudgetCards";
import TotalBudgetCards from './components/TotalBudgetCard';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()


  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction="horizontal" gap="2" className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCards
                key={budget.id}
                name={budget.name.name}
                amount={amount}
                max={budget.name.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCards/>
          <TotalBudgetCards/>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal}
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  )
}

export default App;
