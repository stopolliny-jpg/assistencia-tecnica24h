import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Apple } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/auth/login', { email, password });
      if (response.data.success) {
        login(response.data.data.token, response.data.data.admin);
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Assistência Apple 24H</h2>
          <p className="text-gray-500 mt-2">Acesso Restrito ao Painel</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};
