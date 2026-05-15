import { useContext } from 'react';
import { InstallContext } from '@/contexts/InstallContext';

export function useInstall() {
  return useContext(InstallContext);
}
