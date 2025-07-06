'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-56 flex items-center justify-center px-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Report
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
