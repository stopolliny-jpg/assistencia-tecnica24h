import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';

export const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data } = await api.get('/admin/quotes');
      setQuotes(data.data.quotes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/quotes/${id}/status`, { status });
      fetchQuotes();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar status');
    }
  };

  const statusColors: any = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-purple-100 text-purple-800',
    in_progress: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Orçamentos Recebidos</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-600">Cliente</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Aparelho / Problema</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Data de Envio</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Status</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">Carregando...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">Nenhum orçamento encontrado.</td></tr>
              ) : (
                quotes.map((quote: any) => (
                  <tr key={quote._id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{quote.fullName}</p>
                      <p className="text-sm text-gray-500">{quote.whatsapp}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{quote.deviceModel}</p>
                      <p className="text-sm text-gray-500">{quote.problemType}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        value={quote.status}
                        onChange={(e) => updateStatus(quote._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border-none focus:ring-2 focus:ring-black outline-none cursor-pointer ${statusColors[quote.status]}`}
                      >
                        <option value="new">Novo</option>
                        <option value="contacted">Contatado</option>
                        <option value="scheduled">Agendado</option>
                        <option value="in_progress">Em Andamento</option>
                        <option value="completed">Concluído</option>
                        <option value="lost">Perdido</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <a 
                        href={`https://wa.me/${quote.whatsapp.replace(/\D/g, '')}`}
                        target="_blank" rel="noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
