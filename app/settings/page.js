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
      </div>
    </main>
  );
};

export default SettingsPage;
