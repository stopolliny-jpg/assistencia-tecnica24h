import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export const Settings = () => {
  const [config, setConfig] = useState<any>({
    businessName: '',
    whatsapp: '',
    displayWhatsapp: '',
    instagram: '',
    location: '',
    workingHours: '',
    warranty: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data } = await api.get('/site-config');
      setConfig(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/site-config', config);
      alert('Configurações atualizadas com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar configurações.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Configurações do Site</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
            <input 
              name="businessName" value={config.businessName} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input 
              name="instagram" value={config.instagram} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (Apenas Números com DDI)</label>
            <input 
              name="whatsapp" value={config.whatsapp} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
              placeholder="Ex: 5511985786310"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (Visualização)</label>
            <input 
              name="displayWhatsapp" value={config.displayWhatsapp} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
              placeholder="Ex: (11) 98578-6310"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Localização Completa</label>
            <input 
              name="location" value={config.location} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Funcionamento</label>
            <input 
              name="workingHours" value={config.workingHours} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Termos de Garantia</label>
            <input 
              name="warranty" value={config.warranty} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={saving} className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 transition">
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};
