import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ clientName: '', videoUrl: '', thumbnailUrl: '', description: '', rating: 5, isActive: true, order: 0 });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await api.get('/admin/feedbacks');
      setFeedbacks(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/feedbacks', formData);
      alert('Feedback salvo!');
      setShowForm(false);
      fetchFeedbacks();
      setFormData({ clientName: '', videoUrl: '', thumbnailUrl: '', description: '', rating: 5, isActive: true, order: 0 });
    } catch (error) {
      alert('Erro ao salvar feedback');
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/feedbacks/${id}`, { isActive: !currentStatus });
      fetchFeedbacks();
    } catch (error) {
      alert('Erro ao alterar status');
    }
  };

  const deleteFeedback = async (id: string) => {
    if(!window.confirm('Excluir este feedback?')) return;
    try {
      await api.delete(`/admin/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (error) {
      alert('Erro ao excluir');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Feedbacks em Vídeo</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-black text-white px-4 py-2 rounded-lg font-medium">
          {showForm ? 'Cancelar' : 'Novo Feedback'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm">Nome do Cliente</label><input required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, clientName: e.target.value})} /></div>
          <div><label className="block text-sm">URL do Vídeo (Ex: YouTube, MP4)</label><input type="url" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, videoUrl: e.target.value})} /></div>
          <div><label className="block text-sm">URL da Thumbnail (Opcional)</label><input type="url" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} /></div>
          <div><label className="block text-sm">Nota (1 a 5)</label><input type="number" min="1" max="5" required value={formData.rating} className="w-full border p-2 rounded" onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} /></div>
          <div className="md:col-span-2"><label className="block text-sm">Descrição Curta</label><input className="w-full border p-2 rounded" onChange={e => setFormData({...formData, description: e.target.value})} /></div>
          <div className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} id="isActive"/>
            <label htmlFor="isActive">Exibir no site</label>
          </div>
          <div className="md:col-span-2">
             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Feedback</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? <p>Carregando...</p> : feedbacks.map((item: any) => (
          <div key={item._id} className="bg-white p-4 rounded-xl border relative shadow-sm">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
               {item.thumbnailUrl ? <img src={item.thumbnailUrl} className="object-cover w-full h-full" alt="thumb" /> : <span className="text-gray-400">Vídeo</span>}
            </div>
            <h3 className="font-bold text-lg">{item.clientName}</h3>
            <p className="text-sm text-gray-500 mb-4">{item.description}</p>
            <div className="flex gap-2 text-sm">
              <button onClick={() => toggleStatus(item._id, item.isActive)} className={`px-2 py-1 rounded ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {item.isActive ? 'Ativo' : 'Inativo'}
              </button>
              <button onClick={() => deleteFeedback(item._id)} className="px-2 py-1 rounded bg-red-50 text-red-600">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
