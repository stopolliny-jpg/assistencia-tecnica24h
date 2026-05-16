import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Calendar, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const GoogleIntegration = () => {
  const [status, setStatus] = useState<any>(null);
  const [calendars, setCalendars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchStatus();
    if (searchParams.get('success') === 'true') {
      alert('Google Agenda conectada com sucesso!');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchStatus = async () => {
    try {
      const { data } = await api.get('/admin/google/status');
      setStatus(data.data);
      if (data.data.isConnected) {
        fetchCalendars();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCalendars = async () => {
    try {
      const { data } = await api.get('/admin/google/calendars');
      setCalendars(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const { data } = await api.get('/admin/google/auth-url');
      window.location.href = data.data.authUrl;
    } catch (error) {
      alert('Erro ao gerar URL de autenticação.');
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm('Tem certeza que deseja desconectar o Google Agenda?')) return;
    try {
      await api.post('/admin/google/disconnect');
      fetchStatus();
    } catch (error) {
      alert('Erro ao desconectar.');
    }
  };

  const handleCalendarChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCalendarId = e.target.value;
    try {
      await api.patch('/admin/google/calendar', { calendarId: newCalendarId });
      setStatus({ ...status, calendarId: newCalendarId });
      alert('Calendário padrão atualizado!');
    } catch (error) {
      alert('Erro ao atualizar calendário.');
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Carregando integrações...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Integração Google Agenda</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-start gap-6">
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
            <Calendar size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Conecte sua conta do Google</h2>
            <p className="text-gray-500 mt-1 mb-6">
              Ao conectar sua conta, todos os agendamentos feitos no site serão enviados automaticamente para sua Google Agenda. Você também pode cancelar pelo painel que será removido lá.
            </p>

            {status?.isConnected ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-4 py-3 rounded-lg border border-green-200">
                  <CheckCircle size={20} />
                  Conectado como: {status.googleEmail}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Escolha a agenda onde os eventos serão criados:
                  </label>
                  <select 
                    value={status.calendarId} 
                    onChange={handleCalendarChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  >
                    <option value="primary">Agenda Principal (Padrão)</option>
                    {calendars.filter(c => c.id !== 'primary').map(cal => (
                      <option key={cal.id} value={cal.id}>{cal.summary}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> Os agendamentos feitos pelo site serão enviados para esta agenda.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  <button onClick={fetchCalendars} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-2">
                    <RefreshCw size={16} /> Recarregar Agendas
                  </button>
                  <button onClick={handleDisconnect} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
                    Desconectar Google Agenda
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={handleConnect} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2">
                  <Calendar size={20} />
                  Conectar Google Agenda
                </button>
                <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <strong>Aviso Importante:</strong> Para que isso funcione, o ID do Cliente Google (OAuth2) precisa estar configurado nas variáveis de ambiente do backend. As URLs de redirecionamento também devem corresponder exatamente a <code>http://localhost:3001/api/admin/google/callback</code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
