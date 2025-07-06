'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BudgetForm({ editingBudget, onSave, onCancel }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // yyyy-mm

  useEffect(() => {
    if (editingBudget) {
      setCategory(editingBudget.category);
      setAmount(editingBudget.amount);
      setMonth(editingBudget.month);
    } else {
      setCategory('');
      setAmount('');
      setMonth(new Date().toISOString().slice(0, 7));
    }
  }, [editingBudget]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert('Please enter a category');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!month) {
      alert('Please select a valid month');
      return;
    }

    const payload = {
      category: category.trim(),
      amount: parseFloat(amount),
      month,
    };

    const url = editingBudget ? `/api/budget/${editingBudget._id}` : '/api/budget';
    const method = editingBudget ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSave();
        onCancel();
      } else {
        alert('Failed to save budget');
      }
    } catch (error) {
      alert('Error saving budget');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 max-w-md">
      <h2 className="text-xl font-bold">{editingBudget ? 'Edit Budget' : 'Set Budget'}</h2>
      <Input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Input
        type="month"
        value={month}
        onChange={e => setMonth(e.target.value)}
      />
      <div className="flex gap-4">
        <Button type="submit">{editingBudget ? 'Update' : 'Save'}</Button>
        {editingBudget && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
