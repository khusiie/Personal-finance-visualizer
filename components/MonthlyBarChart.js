'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function MonthlyBarChart({ transactions }) {
  // Group by month
  const monthlyData = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.amount += txn.amount;
    } else {
      acc.push({ month, amount: txn.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-semibold text-lg mb-4">📊 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
