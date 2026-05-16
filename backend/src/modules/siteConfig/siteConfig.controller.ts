import { Request, Response } from 'express';
import { SiteConfig } from './siteConfig.model';
import { successResponse } from '../../utils/apiResponse';

const DEFAULT_CONFIG = {
  businessName: 'Assistência Apple 24H',
  whatsapp: '5511985786310',
  displayWhatsapp: '(11) 98578-6310',
  instagram: '@assistenciaapple24h',
  location: 'Capão Redondo — São Paulo, SP',
  workingHours: 'Segunda a sexta — 24 horas',
  warranty: '90 dias de garantia'
};

export const getSiteConfig = async (req: Request, res: Response) => {
  let config = await SiteConfig.findOne();

  if (!config) {
    config = await SiteConfig.create(DEFAULT_CONFIG);
  }

  res.json(successResponse('Configurações do site.', config));
};

export const updateSiteConfig = async (req: Request, res: Response) => {
  let config = await SiteConfig.findOne();

  if (!config) {
    config = await SiteConfig.create(DEFAULT_CONFIG);
  }

  const updatedConfig = await SiteConfig.findByIdAndUpdate(config._id, req.body, { new: true, runValidators: true });

  res.json(successResponse('Configurações atualizadas.', updatedConfig));
};
