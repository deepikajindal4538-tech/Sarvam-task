import React from 'react';
import { Globe, Volume2, VolumeX, ShieldCheck, HelpCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../shared/servicesData';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../../data/translations';

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
    <header className="glass-header sticky top-0 z-50 px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 shadow-md shadow-orange-500/20 text-white font-bold text-xl">
            <span className="select-none tracking-tighter">BS</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>{t.appName}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  {currentLangObj.nativeName}
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Digital India Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.badgeGov}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleAudioMute}
            title={isAudioMuted ? 'Unmute Voice Responses' : 'Mute Voice Responses'}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium shadow-sm"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-500" />
                <span className="hidden md:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">Voice ON</span>
              </>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 hover:border-orange-300 focus-within:ring-2 focus-within:ring-orange-500">
              <Globe className="w-4 h-4 text-orange-500 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
                aria-label={t.selectLanguage}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Help button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
            title="About BoloSaathi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
