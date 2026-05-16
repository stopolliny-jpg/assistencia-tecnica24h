export interface SiteConfig {
  businessName: string;
  whatsapp: string;
  displayWhatsapp: string;
  instagram: string;
  location: string;
  workingHours: string;
  warranty: string;
}

export interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityData {
  date: string;
  slots: AvailabilitySlot[];
}

export interface QuoteFormData {
  fullName: string;
  whatsapp: string;
  deviceModel: string;
  problemType: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  slotId?: string;
}

export interface QuotePayload {
  fullName: string;
  whatsapp: string;
  deviceModel: string;
  problemType: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  source: string;
  pageUrl: string;
}

export interface QuoteWithBookingPayload {
  slotId: string;
  fullName: string;
  whatsapp: string;
  deviceModel: string;
  problemType: string;
  description: string;
  source: string;
  pageUrl: string;
}

export interface Feedback {
  id: string;
  clientName: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description: string;
  rating: number;
  isActive: boolean;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface QuoteResponse {
  quote: Record<string, unknown>;
  booking?: Record<string, unknown>;
  whatsappUrl: string;
  googleCalendarSynced?: boolean;
  warning?: string | null;
}
