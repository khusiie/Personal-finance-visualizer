'use client';

import { useState, useEffect } from 'react';
import BudgetForm from '@/components/BudgetForm';
import BudgetList from '@/components/BudgetList';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import Navbar from '@/components/Navbar';

export default function BudgetPage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [editingBudget, setEditingBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    }

    async function fetchBudgets() {
      const res = await fetch(`/api/budget?month=${month}`);
      const data = await res.json();
      setBudgets(data);
    }

    fetchTransactions();
    fetchBudgets();
  }, [month]);

  const refreshBudgets = async () => {
    const res = await fetch(`/api/budget?month=${month}`);
    const data = await res.json();
    setBudgets(data);
    setEditingBudget(null);
  };

  const deleteBudget = async (id) => {
    const res = await fetch(`/api/budget/${id}`, { method: 'DELETE' });
    if (res.ok) refreshBudgets();
    else alert('Failed to delete budget');
  };

  return (
    <main className="min-h-screen bg-gray-50 sm:ml-56">
      <Navbar />

      <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Month Selector (Centered on Mobile) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-14 sm:mt-0">
          <label htmlFor="month" className="font-semibold text-gray-700 text-center">
            Select Budget Month:
          </label>
          <input
            id="month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Budget Form & List */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Add / Edit Budget</h2>
            <BudgetForm
              editingBudget={editingBudget}
              onSave={refreshBudgets}
              onCancel={() => setEditingBudget(null)}
              month={month}
            />
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Budget List</h2>
            <BudgetList
              budgets={budgets}
              transactions={transactions.filter((t) => t.date?.startsWith(month))}
              onEditBudget={setEditingBudget}
              onDeleteBudget={deleteBudget}
            />
          </div>
        </section>

        {/* Budget Comparison Chart */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Budget vs Actual Comparison
          </h2>
          <BudgetComparisonChart
            budgets={budgets}
            transactions={transactions.filter((t) => t.date?.startsWith(month))}
          />
        </section>
      </div>
    </main>
  );
}
