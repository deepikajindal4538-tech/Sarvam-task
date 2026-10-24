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
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 selection:bg-orange-100">
      {/* Top Sticky Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isAudioMuted={isAudioMuted}
        onToggleAudioMute={handleToggleAudioMute}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Container - Balanced and Centered */}
      <main className="flex-1 w-full py-8 sm:py-10">
        <div className="app-container">
          {/* Centered Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-900 text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>National Citizen Public Services Portal</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How can we assist you today?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
              Speak or type to find verified procedures, required documents checklist, fees, and official government portal links.
            </p>
          </div>

          {/* Unified Voice & Text Search Bar */}
          <div className="w-full max-w-4xl mx-auto">
            <VoiceSearchInput
              currentLang={currentLang}
              onSearch={(query, isVoice) => handleSearch(query, isVoice)}
              isProcessing={isProcessing}
            />
          </div>

          {/* Answer Card View */}
          <div ref={answerRef} className="w-full max-w-4xl mx-auto pt-2">
            {activeResult && (
              <AnswerCard
                result={activeResult}
                currentLang={currentLang}
                onAskFollowUp={(question) => handleSearch(question, false)}
                isAudioMuted={isAudioMuted}
              />
            )}
          </div>

          {/* Scheme Catalog Explorer Drawer */}
          <div className="w-full max-w-4xl mx-auto mt-10 pt-6 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Grid className="w-4 h-4 text-orange-600" />
                <span>Explore Government Services Directory</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCatalog(!showCatalog)}
                className="text-xs font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 px-3 py-1.5 rounded-lg transition-colors"
              >
                {showCatalog ? 'Hide Directory' : 'Show All Schemes'}
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
        </div>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold">
            <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-[10px] text-white font-black shadow-2xs">
              BS
            </div>
            <span className="text-sm">BoloSaathi</span>
            <span className="text-slate-400 font-normal hidden md:inline">
              • Official Citizen Public Services Guide
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
              National Portal of India
            </a>
            <span>•</span>
            <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
              myAadhaar
            </a>
            <span>•</span>
            <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
              Ayushman PM-JAY
            </a>
            <span>•</span>
            <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
              PM-KISAN
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Citizen Helplines: <span className="font-semibold text-slate-700">1947</span> (Aadhaar) | <span className="font-semibold text-slate-700">14555</span> (Health)
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
