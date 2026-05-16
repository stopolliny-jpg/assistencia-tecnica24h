import { useState, useEffect } from 'react';
import { getSiteConfig, FALLBACK_SITE_CONFIG } from '../services/siteConfig';
import type { SiteConfig } from '../types';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(FALLBACK_SITE_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSiteConfig();
      setConfig(data);
      setLoading(false);
    }
    load();
  }, []);

  return { config, loading };
}
