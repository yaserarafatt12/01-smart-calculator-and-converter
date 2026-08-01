'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share, PlusSquare, ArrowDown, Bookmark } from 'lucide-react';
import { Language } from '@/lib/i18n/translations';

interface PwaInstallPromptProps {
  language?: Language;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ language = 'id' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true;
      if (isStandalone) return;

      const dismissed = localStorage.getItem('smart_calc_pwa_dismissed');
      if (dismissed) return;

      const userAgent = window.navigator.userAgent.toLowerCase();
      const iosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(iosDevice);

      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Show prompt banner automatically after 3 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    } else {
      setShowIOSModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSModal(false);
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_calc_pwa_dismissed', 'true');
    }
  };

  if (!showPrompt || isDismissed) return null;

  return (
    <>
      {/* Bottom Floating PWA Banner (Visible on both iOS & Android) */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in slide-in-from-bottom-5 duration-300 font-sans">
        <div className="p-3.5 rounded-3xl bg-slate-900/95 dark:bg-[#181c22]/95 backdrop-blur-xl border border-indigo-500/40 text-white shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shrink-0">
              <Smartphone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black tracking-tight">
                {language === 'id' ? 'Pasang Aplikasi di HP' : 'Install Mobile App'}
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                {isIOS
                  ? (language === 'id' ? 'Pasang via Safari (Share → Layar Utama)' : 'Add to iPhone Home Screen')
                  : (language === 'id' ? 'Bekerja mandiri & 100% offline' : 'Work 100% offline')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
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

      {/* Special iOS Step-by-Step Tooltip Sheet */}
      {showIOSModal && (
        <div
          onClick={() => setShowIOSModal(false)}
          className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in duration-200 cursor-pointer font-sans"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm mx-auto bg-slate-900 text-white border border-slate-700/80 rounded-3xl p-5 shadow-2xl space-y-4 relative animate-in slide-in-from-bottom duration-300 cursor-default"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                {language === 'id' ? 'Cara Pasang di iPhone (Safari)' : 'How to Install on iPhone'}
              </span>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-medium text-slate-200">
              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <div className="p-2 rounded-xl bg-indigo-600 text-white font-black shrink-0 text-xs">1</div>
                <div>
                  Ketuk ikon <strong className="text-indigo-400 font-extrabold inline-flex items-center gap-1">Bagikan / Share <Share className="w-3.5 h-3.5 inline" /></strong> di menu peramban Safari (bawah/atas layar).
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <div className="p-2 rounded-xl bg-indigo-600 text-white font-black shrink-0 text-xs">2</div>
                <div>
                  Geser menu ke bawah, ketuk <strong className="text-emerald-400 font-extrabold inline-flex items-center gap-1">"Tambah ke Layar Utama" <PlusSquare className="w-3.5 h-3.5 inline" /></strong> atau <strong className="text-emerald-400 font-extrabold">"Tambah Pintasan"</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <div className="p-2 rounded-xl bg-indigo-600 text-white font-black shrink-0 text-xs">3</div>
                <div>
                  Ketuk <strong className="text-indigo-300 font-extrabold">"Tambah"</strong> di pojok kanan atas. Ikon aplikasi akan langsung muncul di Layar Utama iPhone Anda!
                </div>
              </div>
            </div>

            <div className="pt-1 text-center flex flex-col items-center">
              <ArrowDown className="w-5 h-5 text-indigo-400 animate-bounce mb-1" />
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-500 transition-colors btn-press-effect"
              >
                {language === 'id' ? 'Saya Mengerti' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PwaInstallPrompt;
