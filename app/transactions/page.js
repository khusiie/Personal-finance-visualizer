'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import Navbar from '@/components/Navbar';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [editingTxn, setEditingTxn] = useState(null);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    async function fetchTransactions() {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(txn => txn.date?.startsWith(month));

  return (
    <main className="min-h-screen p-4 bg-blend-lighten ml-56 max-w-7xl mx-auto">
      <Navbar />

      {/* Add Transaction Form */}
      <section id="add-transaction" className="bg-white rounded-md shadow p-6 mb-6">
        <TransactionForm
          transaction={editingTxn}
          onAdd={txn => setTransactions(prev => [...prev, txn])}
          onEdit={updated => setTransactions(prev => prev.map(t => t._id === updated._id ? updated : t))}
          onDelete={async (id) => {
            await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
            setTransactions(prev => prev.filter(t => t._id !== id));
          }}
          onCancel={() => setEditingTxn(null)}
        />
      </section>

      {/* Transactions List */}
      <section className="bg-white rounded-md shadow p-6 overflow-auto max-h-[70vh]">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <TransactionList
          transactions={filteredTransactions}
          onEdit={setEditingTxn}
          onDelete={async (id) => {
            await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
            setTransactions(prev => prev.filter(t => t._id !== id));
          }}
        />
      </section>
    </main>
  );
}
