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
    <header className="glass-header sticky top-0 z-50 w-full transition-all">
      <div className="app-container flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 text-white font-black text-sm shadow-sm shrink-0">
            <span>BS</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                {t.appName}
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 uppercase tracking-wider">
                {currentLangObj.nativeName}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 hidden xs:inline">
              Citizen Public Services Assistant
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Official Portal Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gov.in Verified</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleAudioMute}
            title={isAudioMuted ? 'Unmute voice responses' : 'Mute voice responses'}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="hidden sm:inline text-slate-500 font-medium">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Voice ON</span>
              </>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-800 hover:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
              <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
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
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors shadow-xs shrink-0"
            title="About BoloSaathi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
