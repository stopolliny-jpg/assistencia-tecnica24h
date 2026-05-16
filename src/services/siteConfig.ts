import { apiFetch } from './api';
import type { ApiResponse, SiteConfig } from '../types';

export const FALLBACK_SITE_CONFIG: SiteConfig = {
  businessName: 'Assistência Apple 24H',
  whatsapp: '5511985786310',
  displayWhatsapp: '(11) 98578-6310',
  instagram: '@assistenciaapple24h',
  location: 'Capão Redondo — São Paulo, SP',
  workingHours: 'Segunda a sexta — 24 horas',
  warranty: '90 dias de garantia',
};

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const response = await apiFetch<ApiResponse<SiteConfig>>('/site-config');
    if (response.success && response.data) {
      return response.data;
    }
    return FALLBACK_SITE_CONFIG;
  } catch {
    return FALLBACK_SITE_CONFIG;
  }
}
