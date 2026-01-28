'use client';

import { useState } from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import { Button } from '@/app/ui/button';

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setStatus('loading');
    setMessage('');
    
    try {
      const response = await fetch('/api/seed');
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error?.message || 'Failed to seed database');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20">
        <AcmeLogo />
        <h1 className="text-2xl font-bold">Database Seeding</h1>
        
        {status === 'idle' && (
          <p className="text-gray-600 text-center">
            Click the button below to seed your database with initial data.
          </p>
        )}
        
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <p className="text-gray-600">Seeding database...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-green-50 p-4 border border-green-200">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-800 font-semibold text-lg">{message}</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-red-50 p-4 border border-red-200">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 font-semibold">Error: {message}</p>
          </div>
        )}
        
        <Button 
          onClick={handleSeed} 
          disabled={status === 'loading'}
          className="mt-4"
        >
          {status === 'loading' ? 'Seeding...' : 'Seed Database'}
        </Button>
      </div>
    </main>
  );
}
