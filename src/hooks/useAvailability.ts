import { useState, useCallback } from 'react';
import { getAvailabilityByDate } from '../services/availability';
import type { AvailabilitySlot } from '../types';

export function useAvailability() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    setSlots([]);
    try {
      const data = await getAvailabilityByDate(date);
      setSlots(data.slots || []);
    } catch {
      setError(
        'Não conseguimos carregar os horários agora. Você ainda pode falar direto pelo WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { slots, loading, error, fetchAvailability };
}
