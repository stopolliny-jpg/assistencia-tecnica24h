import React from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../hooks/useAuth';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Painel Administrativo</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
