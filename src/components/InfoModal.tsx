import React from 'react';
import { X, ShieldCheck, Mic, Globe, CheckSquare, Sparkles } from 'lucide-react';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../../data/translations';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black flex items-center justify-center text-lg">
            BS
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.appName} (BoloSaathi)</h3>
            <p className="text-xs text-slate-500">{t.tagline}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80">
            <h4 className="font-bold text-orange-950 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Voice-First Citizen Experience</span>
            </h4>
            <p>
              BoloSaathi enables citizens across India to ask questions in their mother tongue using speech or text, and receive official, verified guidance with step-by-step checklists and official government links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Globe className="w-4 h-4 text-orange-600" />
                <span>8 Indian Languages</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Hindi, English, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Interactive Checklist</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Track and check off required documents with confetti completion feedback.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Mic className="w-4 h-4 text-amber-600" />
                <span>Speech Synthesis (TTS)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Listen to answers spoken aloud with native accents.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>100% Verified Gov Links</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct links to official .gov.in portals (UIDAI, NHA, PM-Kisan, NFSA).
              </p>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-200">
            Privacy: BoloSaathi does not store personal credentials or Aadhaar numbers.
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
