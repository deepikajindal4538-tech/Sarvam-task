import React, { useState, FormEvent } from 'react';
import { Search, X, Mic, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';

interface TextInputBarProps {
  currentLang: LanguageCode;
  onSearch: (query: string) => void;
  onTriggerMic: () => void;
  isProcessing: boolean;
}

export const TextInputBar: React.FC<TextInputBarProps> = ({
  currentLang,
  onSearch,
  onTriggerMic,
  isProcessing,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 my-2">
      <div className="relative flex items-center w-full rounded-2xl bg-white border-2 border-slate-200 focus-within:border-orange-500 shadow-md focus-within:shadow-lg focus-within:shadow-orange-500/10 transition-all overflow-hidden p-1.5">
        <div className="pl-3 pr-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.textPlaceholder}
          disabled={isProcessing}
          className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors mr-1"
            title={t.clear}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Quick inline mic button */}
        <button
          type="button"
          onClick={onTriggerMic}
          className="p-2 text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors mr-1.5"
          title={t.tapToSpeak}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Search Submit */}
        <button
          type="submit"
          disabled={!query.trim() || isProcessing}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
        >
          <span>{t.send}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};
