import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../../shared/types';
import { SUPPORTED_LANGUAGES } from '../../shared/servicesData';
import { TRANSLATIONS } from '../data/translations';
import { speechService } from '../services/speechService';
import { AudioWaveform } from './AudioWaveform';

interface VoiceMicProps {
  currentLang: LanguageCode;
  onTranscriptReady: (transcript: string) => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export const VoiceMic: React.FC<VoiceMicProps> = ({
  currentLang,
  onTranscriptReady,
  isProcessing,
  disabled = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // Stop listening if language changes
  useEffect(() => {
    if (isListening) {
      stopListening();
    }
  }, [currentLang]);

  const toggleListening = () => {
    if (disabled || isProcessing) return;

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setErrorMessage(null);
    setInterimText('');

    if (speechService.isSpeechRecognitionSupported()) {
      setIsListening(true);
      setIsSimulated(false);

      speechService.startListening(
        currentLang,
        (interim) => {
          setInterimText(interim);
        },
        (final) => {
          setIsListening(false);
          setInterimText(final);
          onTranscriptReady(final);
        },
        (err) => {
          setIsListening(false);
          // If browser speech recognition failed (e.g. permission denied or unsupported network)
          if (err === 'not-allowed' || err === 'no-speech' || err === 'audio-capture') {
            setErrorMessage('Microphone access blocked or timed out. You can tap any sample query below or type.');
          } else {
            setErrorMessage(`Voice note: ${err}`);
          }
        }
      );
    } else {
      // Graceful simulated voice input for environments without Web Speech API
      runSimulatedVoice();
    }
  };

  const runSimulatedVoice = () => {
    setIsListening(true);
    setIsSimulated(true);
    speechService.playFeedbackTone('start');

    const sample = currentLangObj.exampleQuery;
    let index = 0;
    setInterimText('');

    const interval = setInterval(() => {
      index += 3;
      if (index <= sample.length) {
        setInterimText(sample.substring(0, index));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsListening(false);
          setIsSimulated(false);
          speechService.playFeedbackTone('stop');
          onTranscriptReady(sample);
        }, 500);
      }
    }, 120);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsSimulated(false);
    speechService.stopListening();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Visual Mic Button */}
      <div className="relative flex items-center justify-center my-3">
        {/* Pulsating background rings when listening */}
        {isListening && (
          <>
            <div className="absolute w-36 h-36 rounded-full bg-orange-400/20 animate-ping pointer-events-none" />
            <div className="absolute w-28 h-28 rounded-full bg-orange-500/30 mic-active pointer-events-none" />
          </>
        )}

        <button
          onClick={toggleListening}
          disabled={disabled || isProcessing}
          aria-label={isListening ? t.listening : t.tapToSpeak}
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
            isListening
              ? 'bg-gradient-to-tr from-rose-600 to-orange-500 text-white scale-105 shadow-orange-500/50'
              : isProcessing
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white hover:scale-105 hover:shadow-orange-500/30'
          }`}
        >
          {isListening ? (
            <div className="flex flex-col items-center gap-1">
              <AudioWaveform color="#ffffff" count={5} />
              <span className="text-[10px] font-bold tracking-wider uppercase">STOP</span>
            </div>
          ) : isProcessing ? (
            <div className="w-8 h-8 border-3 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Mic className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow" />
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
                {currentLang === 'hi' ? 'BOLIYE' : 'SPEAK'}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Status Label */}
      <div className="mt-2 text-center min-h-[56px] flex flex-col items-center justify-center">
        {isListening ? (
          <div className="flex flex-col items-center gap-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{isSimulated ? t.simulatedListening : t.listening}</span>
            </div>
            {interimText && (
              <p className="text-sm font-semibold text-slate-800 italic max-w-md bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                "{interimText}"
              </p>
            )}
          </div>
        ) : isProcessing ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{t.processing}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm sm:text-base font-bold text-slate-800">
              {t.tapToSpeak}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {currentLang === 'hi'
                  ? 'हिंदी में बोलें या नीचे से चुनें'
                  : `Speak in ${currentLangObj.name} or pick a topic below`}
              </span>
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Quick Voice Prompt Pills */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
          Try asking:
        </span>
        <button
          onClick={() => onTranscriptReady(currentLangObj.exampleQuery)}
          className="text-xs font-medium px-3 py-1 rounded-full bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-700 transition-all shadow-sm"
        >
          🎙️ "{currentLangObj.exampleQuery}"
        </button>
        <button
          onClick={() =>
            onTranscriptReady(
              currentLang === 'hi'
                ? 'आयुष्मान भारत 5 लाख कार्ड'
                : 'How to apply for Ayushman Bharat 5 lakh health card?'
            )
          }
          className="text-xs font-medium px-3 py-1 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-all shadow-sm"
        >
          🏥 Ayushman Card
        </button>
        <button
          onClick={() =>
            onTranscriptReady(
              currentLang === 'hi'
                ? 'पीएम किसान सम्मान निधि ई-केवाईसी'
                : 'How to do PM-KISAN eKYC and check installment status?'
            )
          }
          className="text-xs font-medium px-3 py-1 rounded-full bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 transition-all shadow-sm"
        >
          🌾 PM-KISAN ₹6,000
        </button>
      </div>
    </div>
  );
};
