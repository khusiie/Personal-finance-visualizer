'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const SettingsPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 sm:ml-56">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12 sm:py-20 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Settings
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center max-w-xl">
          Customize your personal finance visualizer experience here.
        </p>

        {/* Future settings form area */}
        <div className="mt-10 w-full max-w-2xl bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 text-center">[Settings form coming soon]</p>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
