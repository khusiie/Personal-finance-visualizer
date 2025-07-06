'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const ReportPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 sm:ml-56">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-8 sm:py-20 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Report
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center max-w-2xl">
          This is where your detailed financial report will appear. You can visualize your financial trends, spending categories, and comparisons here.
        </p>

        {/* Responsive container for future charts/components */}
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder charts or reports */}
          <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
            <p className="text-center text-gray-500">[Chart / Summary Card 1]</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
            <p className="text-center text-gray-500">[Chart / Summary Card 2]</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPage;
