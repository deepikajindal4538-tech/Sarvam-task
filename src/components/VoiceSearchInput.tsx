import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Send, X, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../../shared/types';
import { SUPPORTED_LANGUAGES } from '../../shared/servicesData';
import { TRANSLATIONS } from '../data/translations';
import { speechService } from '../services/speechService';
import { AudioWaveform } from './AudioWaveform';

interface VoiceSearchInputProps {
  currentLang: LanguageCode;
  onSearch: (query: string, isVoice?: boolean) => void;
  isProcessing: boolean;
}

export const VoiceSearchInput: React.FC<VoiceSearchInputProps> = ({
  currentLang,
  onSearch,
  isProcessing,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (isListening) {
      stopListening();
    }
  }, [currentLang]);

  const toggleListening = () => {
    if (isProcessing) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setErrorMsg(null);
    setInterimText('');

    if (speechService.isSpeechRecognitionSupported()) {
      setIsListening(true);
      speechService.startListening(
        currentLang,
        (interim) => setInterimText(interim),
        (final) => {
          setIsListening(false);
          setInterimText('');
          setQuery(final);
          onSearch(final, true);
        },
        (err) => {
          setIsListening(false);
          if (err === 'not-allowed') {
            setErrorMsg('Microphone access blocked. Please enable permissions in your browser.');
          } else {
            setErrorMsg('Voice input paused. You can try speaking again or type below.');
          }
        }
      );
    } else {
      // Fallback simulated voice input for environments without Web Speech API
      setIsListening(true);
      speechService.playFeedbackTone('start');
      const sample = currentLangObj.exampleQuery;
      let i = 0;
      const timer = setInterval(() => {
        i += 3;
        if (i <= sample.length) {
          setInterimText(sample.substring(0, i));
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsListening(false);
            setInterimText('');
            setQuery(sample);
            speechService.playFeedbackTone('stop');
            onSearch(sample, true);
          }, 350);
        }
      }, 90);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setInterimText('');
    speechService.stopListening();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      onSearch(query.trim(), false);
    }
  };

  const quickPrompts = [
    { label: 'Aadhaar Address', query: 'How to update address in Aadhaar card online?' },
    { label: 'Ayushman ₹5L Card', query: 'How to apply for Ayushman Bharat 5 lakh health card?' },
    { label: 'PM-KISAN ₹6,000', query: 'How to do PM-KISAN eKYC and check installment status?' },
    { label: 'DigiLocker DL', query: 'How to download Driving License in DigiLocker?' },
    { label: 'Passport Seva', query: 'How to apply for passport in India?' },
  ];

  return (
    <div className="w-full mx-auto">
      {/* Listening Banner if voice recording is active */}
      {isListening && (
        <div className="mb-3 px-4 py-2.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-orange-900">
              {interimText ? `"${interimText}"` : t.listening}
            </span>
            <AudioWaveform color="#ea580c" count={5} />
          </div>
          <button
            type="button"
            onClick={stopListening}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 px-2.5 py-1 rounded-lg hover:bg-rose-100/60 transition-colors shrink-0"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main Search Bar Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full rounded-2xl bg-white border-2 border-slate-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 shadow-sm hover:shadow-md transition-all p-1.5 sm:p-2"
      >
        {/* Left Search Icon */}
        <div className="pl-3 pr-2 text-slate-400 shrink-0">
          <Search className="w-5 h-5" />
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={isListening ? (interimText || 'Listening to your voice...') : query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.textPlaceholder}
          disabled={isProcessing || isListening}
          className="flex-1 min-w-0 bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
        />

        {/* Clear Button */}
        {query && !isListening && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors mr-1 shrink-0"
            title="Clear search text"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Tactile Microphone Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing}
          title={isListening ? 'Stop listening' : 'Tap to speak your query'}
          className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all mr-1.5 shrink-0 ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
              : 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/80 hover:border-orange-300'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-orange-600" />
              <span className="hidden sm:inline">Voice</span>
            </>
          )}
        </button>

        {/* Search / Ask Button */}
        <button
          type="submit"
          disabled={!query.trim() || isProcessing || isListening}
          className="px-4 sm:px-5 py-2.5 bg-slate-900 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Error message */}
      {errorMsg && (
        <div className="mt-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quick query chips */}
      <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase tracking-wider">
          Suggested:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSearch(p.query, false)}
            className="text-xs px-3 py-1 rounded-lg bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 text-slate-700 hover:text-orange-900 font-medium transition-all shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};
