'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { Language } from '@/lib/i18n/translations';

interface PwaInstallPromptProps {
  language?: Language;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ language = 'id' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already installed / standalone
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;
    if (isStandalone) return;

    // Check if user dismissed recently
    const dismissed = localStorage.getItem('smart_calc_pwa_dismissed');
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt banner automatically after 12 seconds of usage
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 12000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_calc_pwa_dismissed', 'true');
    }
  };

  if (!showPrompt || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-3xl bg-slate-900/95 dark:bg-[#181c22]/95 backdrop-blur-xl border border-indigo-500/40 text-white shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shrink-0">
            <Smartphone className="w-5 h-5 animate-bounce-slow" />
          </div>
          <div>
            <div className="text-xs font-black tracking-tight">
              {language === 'id' ? 'Pasang Aplikasi di HP?' : 'Install Mobile App?'}
            </div>
            <div className="text-[10px] text-slate-300 font-medium mt-0.5">
              {language === 'id' ? 'Bisa dibuka mandiri & 100% offline' : 'Open offline anytime without browser'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white transition-all btn-press-effect flex items-center gap-1 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Pasang' : 'Install'}</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
