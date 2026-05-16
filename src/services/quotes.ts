import { apiFetch } from './api';
import type { ApiResponse, QuotePayload, QuoteWithBookingPayload, QuoteResponse } from '../types';

export async function createQuote(data: QuotePayload): Promise<ApiResponse<QuoteResponse>> {
  return apiFetch<ApiResponse<QuoteResponse>>('/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createQuoteWithBooking(
  data: QuoteWithBookingPayload
): Promise<ApiResponse<QuoteResponse>> {
  return apiFetch<ApiResponse<QuoteResponse>>('/public/quote-with-booking', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
