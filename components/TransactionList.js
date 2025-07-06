'use client';

import { Button } from '@/components/ui/button';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{txn.description}</div>
                <div className="text-sm text-gray-500">
                  ₹{txn.amount.toFixed(2)} •{' '}
                  {txn.date ? new Date(txn.date).toLocaleDateString() : ''} •{' '}
                  <span className="font-semibold text-blue-600">{txn.category || 'Others'}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    className="bg-white text-black hover:bg-gray-800"
                    onClick={() => onEdit(txn)}
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => onDelete(txn._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
