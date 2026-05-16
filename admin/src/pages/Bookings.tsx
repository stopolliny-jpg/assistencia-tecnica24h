import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2, XCircle } from 'lucide-react';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/admin/bookings');
      setBookings(data.data.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar status');
    }
  };

  const cancelBooking = async (id: string) => {
    if(!window.confirm('Tem certeza que deseja cancelar? Isso vai liberar o horário na agenda e cancelar no Google Calendar.')) return;
    try {
      await api.patch(`/admin/bookings/${id}/cancel`);
      fetchBookings();
      alert('Agendamento cancelado com sucesso.');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao cancelar');
    }
  };

  const statusColors: any = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-gray-100 text-gray-800',
    no_show: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-gray-600">Cliente</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Aparelho / Problema</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Data e Hora</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Google Calendar</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Status</th>
                <th className="py-4 px-6 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-500">Carregando...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-500">Nenhum agendamento encontrado.</td></tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{booking.fullName}</p>
                      <p className="text-sm text-gray-500">{booking.whatsapp}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{booking.deviceModel}</p>
                      <p className="text-sm text-gray-500">{booking.problemType}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      <p className="font-semibold">{format(new Date(booking.date), 'dd/MM/yyyy')}</p>
                      <p className="text-sm text-gray-500">{booking.startTime} às {booking.endTime}</p>
                    </td>
                    <td className="py-4 px-6">
                      {booking.googleCalendarSynced ? (
                         <a href={booking.googleCalendarHtmlLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-green-600 hover:underline text-sm font-medium">
                           <CheckCircle2 size={16} /> Sincronizado
                         </a>
                      ) : (
                         <div className="flex items-center gap-1 text-orange-500 text-sm font-medium" title={booking.googleCalendarWarning}>
                           <XCircle size={16} /> Não Sincronizado
                         </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        value={booking.status}
                        onChange={(e) => updateStatus(booking._id, e.target.value)}
                        disabled={booking.status === 'cancelled'}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border-none outline-none ${statusColors[booking.status]} ${booking.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <option value="scheduled">Agendado</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="completed">Concluído</option>
                        <option value="no_show">Não Compareceu</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 flex items-center gap-3">
                      <a 
                        href={`https://wa.me/${booking.whatsapp.replace(/\D/g, '')}`}
                        target="_blank" rel="noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        WhatsApp
                      </a>
                      {booking.status !== 'cancelled' && (
                        <button onClick={() => cancelBooking(booking._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                          Cancelar
                        </button>
                      )}
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
