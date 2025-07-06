'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function BudgetComparisonChart({ budgets, transactions }) {
  const spentMap = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const data = budgets.map(b => ({
    category: b.category,
    Budget: b.amount,
    Actual: spentMap[b.category] || 0,
  }));

  return (
    <div className="w-full p-4 bg-white rounded shadow mt-6 overflow-y-auto hide-scrollbar" style={{ maxHeight: '400px' }}>
      <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
