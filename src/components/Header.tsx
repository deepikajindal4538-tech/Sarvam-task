import React from 'react';
import { Globe, Volume2, VolumeX, ShieldCheck, HelpCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../shared/servicesData';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isAudioMuted: boolean;
  onToggleAudioMute: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isAudioMuted,
  onToggleAudioMute,
  onOpenHelp,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="glass-header sticky top-0 z-50 px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
            BS
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                {t.appName}
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                {currentLangObj.nativeName}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleAudioMute}
            title={isAudioMuted ? 'Unmute Voice Responses' : 'Mute Voice Responses'}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold shadow-xs"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline text-slate-500">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Voice ON</span>
              </>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-800 hover:border-orange-300">
              <Globe className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
                aria-label={t.selectLanguage}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Help button */}
          <button
            onClick={onOpenHelp}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-colors shadow-xs"
            title="About BoloSaathi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
