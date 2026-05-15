import { createContext, useState, useEffect, type ReactNode } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallContextType {
  canInstall: boolean;
  install: () => Promise<boolean>;
}

export const InstallContext = createContext<InstallContextType>({
  canInstall: false,
  install: async () => false,
});

export function InstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return result.outcome === 'accepted';
  };

  return (
    <InstallContext.Provider value={{ canInstall: !!deferredPrompt, install }}>
      {children}
    </InstallContext.Provider>
  );
}
