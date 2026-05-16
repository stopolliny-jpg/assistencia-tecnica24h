import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { format, addDays } from 'date-fns';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/availability?date=${selectedDate}`);
      setSlots(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/availability/generate', {
        date: selectedDate,
        startTime,
        endTime,
        durationMinutes: duration
      });
      fetchSlots();
      alert('Horários gerados com sucesso!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao gerar horários');
    }
  };

  const handleClearDay = async () => {
    if(!window.confirm('Tem certeza que deseja apagar todos os horários livres deste dia?')) return;
    try {
      await api.delete(`/admin/availability/day/${selectedDate}`);
      fetchSlots();
      alert('Horários livres apagados.');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao apagar');
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/availability/${id}`, { isAvailable: !currentStatus });
      fetchSlots();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gerenciar Disponibilidade</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Generaton Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Gerar Horários</h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Data</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Início</label>
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fim</label>
                <input 
                  type="time" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Duração (minutos)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="10"
                step="5"
                required
              />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
              Gerar Horários
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
             <button onClick={handleClearDay} className="w-full border border-red-200 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 transition">
                Limpar Horários Livres do Dia
             </button>
          </div>
        </div>

        {/* Slots List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Horários do Dia: {format(new Date(selectedDate), 'dd/MM/yyyy')}</h2>
          </div>

          {loading ? (
            <p className="text-gray-500 text-center py-8">Carregando...</p>
          ) : slots.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum horário configurado para este dia.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {slots.map((slot: any) => (
                <div 
                  key={slot._id} 
                  className={`p-3 rounded-xl border text-center relative ${
                    slot.isBooked 
                      ? 'bg-purple-50 border-purple-200 text-purple-700' 
                      : slot.isAvailable 
                        ? 'bg-green-50 border-green-200 text-green-700 cursor-pointer hover:bg-green-100'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-pointer hover:bg-gray-200'
                  }`}
                  onClick={() => !slot.isBooked && toggleAvailability(slot._id, slot.isAvailable)}
                >
                  <div className="font-bold">{slot.startTime}</div>
                  <div className="text-xs mt-1">
                    {slot.isBooked ? 'Reservado' : slot.isAvailable ? 'Livre' : 'Inativo'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
