import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { VoiceMic } from './components/VoiceMic';
import { TextInputBar } from './components/TextInputBar';
import { AnswerCard } from './components/AnswerCard';
import { ServiceBrowser } from './components/ServiceBrowser';
import { InfoModal } from './components/InfoModal';
import { apiService } from './services/apiService';
import { speechService } from './services/speechService';
import { LanguageCode, QueryResult } from '../shared/types';
import { SUPPORTED_LANGUAGES } from '../shared/servicesData';
import { TRANSLATIONS } from './data/translations';
import { Shield, Sparkles, PhoneCall } from 'lucide-react';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeResult, setActiveResult] = useState<QueryResult | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const answerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // Set initial default answer card on first load in English
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

      // If voice query and not muted and not silent initialization, speak response
      if (isVoice && !isAudioMuted && !silentInit) {
        setTimeout(() => {
          speechService.speak(result.spokenText || result.summary, currentLang);
        }, 300);
      }

      // Smooth scroll to answer card
      if (!silentInit && answerRef.current) {
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } catch {
      // Fallback already handled inside apiService
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    speechService.stopSpeaking();
    setCurrentLang(newLang);

    // If there's an active query, re-run in the new language
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-200">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isAudioMuted={isAudioMuted}
        onToggleAudioMute={handleToggleAudioMute}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          {/* Greeting Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-900 text-xs sm:text-sm font-bold mb-3 shadow-xs">
            <span>{currentLangObj.flag}</span>
            <span>{currentLangObj.greeting}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.heroPrompt}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Centerpiece: Voice Microphone Component */}
        <div className="my-2">
          <VoiceMic
            currentLang={currentLang}
            onTranscriptReady={(transcript) => handleSearch(transcript, true)}
            isProcessing={isProcessing}
          />
        </div>

        {/* Text Input Fallback Bar */}
        <TextInputBar
          currentLang={currentLang}
          onSearch={(query) => handleSearch(query, false)}
          onTriggerMic={() => {}}
          isProcessing={isProcessing}
        />

        {/* Answer Card Anchor & Result */}
        <div ref={answerRef} className="pt-4">
          {activeResult && (
            <AnswerCard
              result={activeResult}
              currentLang={currentLang}
              onAskFollowUp={(question) => handleSearch(question, false)}
              isAudioMuted={isAudioMuted}
            />
          )}
        </div>

        {/* Popular Services Explorer Grid */}
        <ServiceBrowser
          currentLang={currentLang}
          onSelectService={(query) => handleSearch(query, false)}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white">
              BS
            </div>
            <span>BoloSaathi (बोलो साथी)</span>
            <span className="text-[10px] font-semibold text-slate-400">
              • Public Services Voice Assistant
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="https://india.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition-colors"
            >
              National Portal of India
            </a>
            <span>•</span>
            <a
              href="https://myaadhaar.uidai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition-colors"
            >
              myAadhaar
            </a>
            <span>•</span>
            <a
              href="https://pmjay.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition-colors"
            >
              PM-JAY
            </a>
            <span>•</span>
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 transition-colors"
            >
              PM-KISAN
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            For emergencies & public grievances call National Citizen Helpline: <span className="font-bold text-slate-600">1947</span> / <span className="font-bold text-slate-600">14555</span>
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
