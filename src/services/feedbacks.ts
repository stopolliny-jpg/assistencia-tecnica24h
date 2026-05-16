import { apiFetch } from './api';
import type { ApiResponse, Feedback } from '../types';

export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const response = await apiFetch<ApiResponse<Feedback[]>>('/feedbacks');
    if (response.success && Array.isArray(response.data)) {
      return response.data.filter((f) => f.isActive).sort((a, b) => a.order - b.order);
    }
    return [];
  } catch {
    return [];
  }
}
