import { apiFetch } from './api';
import type { ApiResponse, AvailabilityData } from '../types';

export async function getAvailabilityByDate(date: string): Promise<AvailabilityData> {
  const response = await apiFetch<ApiResponse<AvailabilityData>>(
    `/public/availability?date=${date}`
  );
  
  if (response.success && response.data) {
    return response.data;
  }
  
  throw new Error(response.message || 'Não foi possível carregar os horários.');
}
