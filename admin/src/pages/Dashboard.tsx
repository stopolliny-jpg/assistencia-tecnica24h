import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { 
  Inbox, 
  CalendarCheck2, 
  TrendingUp, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [googleStatus, setGoogleStatus] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    fetchGoogleStatus();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchGoogleStatus = async () => {
    try {
      const { data } = await api.get('/admin/google/status');
      setGoogleStatus(data.data);
    } catch (error) {
      console.error('Error fetching google status', error);
    }
  };

  if (!stats) return <div className="p-8 text-center text-gray-500">Carregando painel...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Geral</h1>
          <p className="text-gray-500 text-sm mt-1">Visão geral do seu sistema de agendamentos e orçamentos.</p>
        </div>
        
        {googleStatus && (
          <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${googleStatus.isConnected ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
            {googleStatus.isConnected ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {googleStatus.isConnected ? 'Google Agenda Conectado' : 'Google Agenda Desconectado'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Novos Orçamentos" value={stats.newQuotes} icon={Inbox} color="blue" />
        <StatCard title="Agendamentos Hoje" value={stats.todayBookings} icon={CalendarCheck2} color="green" />
        <StatCard title="Próximos Agendamentos" value={stats.upcomingBookings} icon={TrendingUp} color="purple" />
        <StatCard title="Problema Principal" value={stats.mostCommonProblemType || 'N/A'} icon={AlertCircle} color="orange" isText />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Orçamentos</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-600">Total Recebidos</span>
                <span className="font-semibold text-gray-900">{stats.totalQuotes}</span>
             </div>
             <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-600">Agendados a partir do site</span>
                <span className="font-semibold text-blue-600">{stats.scheduledQuotes}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-600">Finalizados</span>
                <span className="font-semibold text-green-600">{stats.completedQuotes}</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Agendamentos (Booking)</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-600">Total de Agendamentos</span>
                <span className="font-semibold text-gray-900">{stats.totalBookings}</span>
             </div>
             <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-600">Cancelados</span>
                <span className="font-semibold text-red-600">{stats.cancelledBookings}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-600">Feedbacks Ativos no Site</span>
                <span className="font-semibold text-purple-600">{stats.activeFeedbacks} / {stats.totalFeedbacks}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, isText = false }: any) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-xl ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`font-bold text-gray-900 mt-1 ${isText ? 'text-lg' : 'text-3xl'}`}>{value}</p>
      </div>
    </div>
  );
};
