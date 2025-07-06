'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BudgetList({ budgets = [], transactions = [], onEditBudget, onDeleteBudget }) {
  if (!budgets.length) {
    return <p className="text-gray-500">No budgets set for this month</p>;
  }

  const spentMap = transactions.reduce((acc, txn) => {
    if (txn.category) acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  return (
    <div className="max-w-2xl">
      <div className="h-[400px] overflow-y-auto pr-2 space-y-4">
        {budgets.map(budget => {
          const spent = spentMap[budget.category] || 0;
          const percent = Math.min((spent / budget.amount) * 100, 100);

          let barColor = 'bg-green-500';
          if (percent > 100) barColor = 'bg-red-600';
          else if (percent > 80) barColor = 'bg-yellow-500';

          return (
            <div
              key={budget._id}
              className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold capitalize">{budget.category}</h3>
                <span className="text-sm text-gray-600">
                  ₹{spent.toFixed(2)} / ₹{budget.amount.toFixed(2)}
                </span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-3">
                <div
                  className={cn(barColor, 'h-3 transition-all duration-300')}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditBudget(budget)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className=" bg-black text-white"
                  onClick={() => {
                    if (confirm(`Delete budget for ${budget.category}?`)) {
                      onDeleteBudget(budget._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
