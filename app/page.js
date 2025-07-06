"use client";

import { useEffect, useState } from "react";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    async function fetchTransactions() {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((txn) =>
    txn.date?.startsWith(month)
  );

  return (
    <main className="min-h-screen p-4 bg-white  ml-56">
      <Navbar />
      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-10 py-2  text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          Welcome to Your Financial Visualizer
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Track your finances effortlessly and gain clear insights with
          intuitive charts.
        </p>
      </div>

      <div className="py-10 px-10 max-w-7xl mx-auto">
        <SummaryCards transactions={filteredTransactions} />
      </div>

      {/* Improved Chart Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <section className="bg-white rounded-md shadow p-6 flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
          <MonthlyBarChart transactions={filteredTransactions} />
        </section>

        <section className="bg-white rounded-md shadow p-6 flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
          <CategoryPieChart transactions={filteredTransactions} />
        </section>
      </div>
    </main>
  );
}
