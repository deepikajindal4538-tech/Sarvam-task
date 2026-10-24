import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { VoiceSearchInput } from './components/VoiceSearchInput';
import { AnswerCard } from './components/AnswerCard';
import { ServiceBrowser } from './components/ServiceBrowser';
import { InfoModal } from './components/InfoModal';
import { apiService } from './services/apiService';
import { speechService } from './services/speechService';
import { LanguageCode, QueryResult } from '../shared/types';
import { SUPPORTED_LANGUAGES } from '../shared/servicesData';
import { TRANSLATIONS } from './data/translations';
import { Sparkles, Grid } from 'lucide-react';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeResult, setActiveResult] = useState<QueryResult | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [showCatalog, setShowCatalog] = useState<boolean>(false);

  const answerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // Load initial clean featured service on mount
  useEffect(() => {
    handleSearch('How to update address in Aadhaar card online', false, true);
  }, []);

  const handleSearch = async (queryText: string, isVoice: boolean = false, silentInit: boolean = false) => {
    if (!queryText.trim()) return;

    setIsProcessing(true);
    setLastQuery(queryText);

    try {
      const result = await apiService.submitQuery(queryText, currentLang, isVoice);
      setActiveResult(result);

      if (isVoice && !isAudioMuted && !silentInit) {
        setTimeout(() => {
          speechService.speak(result.spokenText || result.summary, currentLang);
        }, 300);
      }

      if (!silentInit && answerRef.current) {
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch {
      // Fallback handled in apiService
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    speechService.stopSpeaking();
    setCurrentLang(newLang);

    if (lastQuery) {
      setTimeout(() => {
        apiService.submitQuery(lastQuery, newLang).then((res) => {
          setActiveResult(res);
        });
      }, 50);
    }
  };

  const handleToggleAudioMute = () => {
    if (!isAudioMuted) {
      speechService.stopSpeaking();
    }
    setIsAudioMuted((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 selection:bg-orange-100">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isAudioMuted={isAudioMuted}
        onToggleAudioMute={handleToggleAudioMute}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Sleek, Focused Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-900 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Digital India Citizen Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How can we assist you today?
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Speak or type to find verified procedures, required documents, and official portals.
          </p>
        </div>

        {/* Clean Unified Voice & Text Search Bar */}
        <VoiceSearchInput
          currentLang={currentLang}
          onSearch={(query, isVoice) => handleSearch(query, isVoice)}
          isProcessing={isProcessing}
        />

        {/* Answer Card View */}
        <div ref={answerRef} className="pt-2">
          {activeResult && (
            <AnswerCard
              result={activeResult}
              currentLang={currentLang}
              onAskFollowUp={(question) => handleSearch(question, false)}
              isAudioMuted={isAudioMuted}
            />
          )}
        </div>

        {/* Catalog Toggle & Service Browser */}
        <div className="mt-8 pt-6 border-t border-slate-200/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Grid className="w-4 h-4 text-orange-600" />
              <span>Browse All Government Schemes</span>
            </h3>
            <button
              onClick={() => setShowCatalog(!showCatalog)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              {showCatalog ? 'Hide Directory' : 'Show Directory'}
            </button>
          </div>

          {showCatalog && (
            <div className="animate-fadeIn">
              <ServiceBrowser
                currentLang={currentLang}
                onSelectService={(query) => handleSearch(query, false)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="mt-auto border-t border-slate-200/70 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <div className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center text-[10px] text-white font-black">
              BS
            </div>
            <span>BoloSaathi</span>
            <span className="text-[11px] font-normal text-slate-400">
              • Official Citizen Public Services Guide
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              National Portal
            </a>
            <span>•</span>
            <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              myAadhaar
            </a>
            <span>•</span>
            <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              Ayushman PM-JAY
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Toll-Free Helplines: <span className="font-semibold text-slate-600">1947</span> (Aadhaar) | <span className="font-semibold text-slate-600">14555</span> (Health)
          </p>
        </div>
      </footer>

      {/* Info Modal */}
      <InfoModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
};

export default App;
