import { env } from '../config/env';

interface WhatsappData {
  fullName: string;
  whatsapp: string;
  deviceModel: string;
  problemType: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export const buildWhatsappUrl = (data: WhatsappData) => {
  let message = '';

  if (data.date && data.startTime) {
    message = `Olá, Assistência Apple 24H! Gostaria de solicitar um orçamento com agendamento.\n\nNome: ${data.fullName}\nWhatsApp: ${data.whatsapp}\nAparelho: ${data.deviceModel}\nProblema: ${data.problemType}\nDescrição: ${data.description || 'Nenhuma'}\nData: ${data.date}\nHorário: ${data.startTime} às ${data.endTime || '...'}\n\nPode me ajudar?`;
  } else {
    message = `Olá, Assistência Apple 24H! Gostaria de solicitar um orçamento.\n\nNome: ${data.fullName}\nWhatsApp: ${data.whatsapp}\nAparelho: ${data.deviceModel}\nProblema: ${data.problemType}\nDescrição: ${data.description || 'Nenhuma'}\n\nPode me ajudar?`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${env.WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
