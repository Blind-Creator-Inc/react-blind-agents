import { createContext, useContext } from 'react';
import { CDN_BASE } from './types';

export interface BlindAgentsContextValue {
  /** Optional — only the Report (bug-reporter) widget needs it. The Chat
   *  widget authenticates by agent id alone. */
  apiKey?: string;
  userWhatsapp?: string;
  externalId?: string;
  apiUrl?: string;
  cdnBase: string;
  strategy: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
}

export const BlindAgentsContext = createContext<BlindAgentsContextValue>({
  cdnBase: CDN_BASE,
  strategy: 'afterInteractive',
});

export function useBlindAgents(): BlindAgentsContextValue {
  return useContext(BlindAgentsContext);
}
