'use client';

export default function SummaryCards({ transactions }) {
  const totalExpenses = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const categoryTotals = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const recentTxns = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-stretch">
      {/* Total Expenses */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center h-[300px]">
        <h3 className="text-xl font-bold mb-2 tracking-wide uppercase text-center">
          Total Expenses
        </h3>
        <p className="text-4xl md:text-5xl font-extrabold text-center">
          ₹{totalExpenses.toFixed(2)}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 h-[300px] flex flex-col">
        <h3 className="text-2xl text-gray-800 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          Category Breakdown
        </h3>
        <ul className="divide-y divide-gray-100 overflow-y-auto scrollbar-hide">
          {sortedCategories.length > 0 ? (
            sortedCategories.map(([category, amount]) => (
              <li key={category} className="flex justify-between py-2">
                <span className="capitalize text-gray-700">{category}</span>
                <span className="font-semibold text-gray-900">
                  ₹{amount.toFixed(2)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic text-center py-4">
              No transactions
            </li>
          )}
        </ul>
      </div>

      {/* Most Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6 h-[300px] flex flex-col">
        <h3 className="text-2xl text-gray-800 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          Most Recent Transactions
        </h3>
        <ul className="overflow-y-auto scrollbar-hide">
          {recentTxns.length > 0 ? (
            recentTxns.map((txn) => (
              <li key={txn._id} className="border-b border-gray-100 py-3 last:border-0">
                <div className="font-medium text-gray-900">
                  {txn.description || 'No description'}
                </div>
                <div className="text-sm text-gray-500">
                  ₹{txn.amount.toFixed(2)} — {new Date(txn.date).toLocaleDateString()}
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic text-center py-4">
              No transactions
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
