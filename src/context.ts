import { createContext, useContext } from 'react';
import { CDN_BASE } from './types';

export interface BlindAgentsContextValue {
  apiKey: string;
  userWhatsapp?: string;
  externalId?: string;
  cdnBase: string;
  strategy: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
}

export const BlindAgentsContext = createContext<BlindAgentsContextValue>({
  apiKey: '',
  cdnBase: CDN_BASE,
  strategy: 'afterInteractive',
});

export function useBlindAgents(): BlindAgentsContextValue {
  return useContext(BlindAgentsContext);
}
