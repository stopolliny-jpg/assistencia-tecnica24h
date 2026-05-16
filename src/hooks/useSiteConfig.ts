import { useState, useEffect } from 'react';
import { getSiteConfig, FALLBACK_SITE_CONFIG } from '../services/siteConfig';
import type { SiteConfig } from '../types';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(FALLBACK_SITE_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteConfig().then((data) => {
      setConfig(data);
      setLoading(false);
    });
  }, []);

  return { config, loading };
}
