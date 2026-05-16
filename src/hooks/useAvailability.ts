import { useState, useCallback } from 'react';
import { getAvailabilityByDate } from '../services/availability';
import type { AvailabilitySlot } from '../types';

export function useAvailability() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async (date: string) => {
    if (!date) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getAvailabilityByDate(date);
      setSlots(data.slots);
    } catch (err: any) {
      setError('Não conseguimos carregar horários agora. Você ainda pode falar direto pelo WhatsApp.');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    slots,
    loading,
    error,
    fetchAvailability,
  };
}
