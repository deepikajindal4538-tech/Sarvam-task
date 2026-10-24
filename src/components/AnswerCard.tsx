import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ListOrdered,
  UserCheck,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { QueryResult, LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../../data/translations';
import { speechService } from '../../services/speechService';
import { Checklist } from './Checklist';
import { SourceLinks } from './SourceLinks';
import { AudioWaveform } from './AudioWaveform';

interface AnswerCardProps {
  result: QueryResult;
  currentLang: LanguageCode;
  onAskFollowUp: (question: string) => void;
  isAudioMuted?: boolean;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  result,
  currentLang,
  onAskFollowUp,
  isAudioMuted = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechService.speak(
        result.spokenText || result.summary,
        currentLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handleCopy = () => {
    const textToCopy = `${result.title}\n\nSummary:\n${result.summary}\n\nSteps:\n${result.steps
      .map((s) => `${s.stepNumber}. ${s.title}: ${s.description}`)
      .join('\n')}\n\nFee: ${result.fee}\nTime: ${result.turnaroundTime}\nOfficial Portal: ${
      result.officialLinks[0]?.url || ''
    }`;

    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: result.title,
        text: result.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <article className="glass-card rounded-3xl p-5 sm:p-8 max-w-4xl mx-auto my-6 border border-slate-200 transition-all">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-orange-100 text-orange-700 font-bold">
            <Building2 className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              {result.category.replace('_', ' ')}
            </span>
            <p className="text-xs text-slate-500 font-medium">
              Verified Citizen Advisory
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-1 text-xs font-semibold"
            title={t.copy}
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">{t.copy}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title={t.share}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title={t.print}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title & Voice Play Bar */}
      <div className="mt-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
          {result.title}
        </h2>

        {/* Summary takeaway */}
        <p className="text-sm sm:text-base text-slate-700 mt-2.5 leading-relaxed font-normal bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100">
          {result.summary}
        </p>

        {/* Voice Play Button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-sm ${
              isPlayingAudio
                ? 'bg-rose-600 text-white shadow-rose-600/30'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.stopAudio}</span>
                <AudioWaveform color="#ffffff" count={5} />
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.listenAnswer}</span>
              </>
            )}
          </button>
          {isPlayingAudio && (
            <span className="text-xs font-semibold text-emerald-700 animate-pulse">
              {t.speaking}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Document Checklist */}
      {result.checklist && result.checklist.length > 0 && (
        <Checklist
          items={result.checklist}
          serviceTitle={result.title}
          currentLang={currentLang}
        />
      )}

      {/* Step-by-Step Application Guide */}
      {result.steps && result.steps.length > 0 && (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-3">
            <ListOrdered className="w-5 h-5 text-orange-600" />
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {t.stepsTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {result.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-xl bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {step.stepNumber}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eligibility Criteria */}
      {result.eligibility && result.eligibility.length > 0 && (
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.eligibilityTitle}
            </h3>
          </div>
          <ul className="space-y-2 mt-2">
            {result.eligibility.map((crit, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source Links & Helplines Component */}
      <SourceLinks
        officialLinks={result.officialLinks}
        helplines={result.helplines}
        fee={result.fee}
        turnaroundTime={result.turnaroundTime}
        department={result.department}
        currentLang={currentLang}
      />

      {/* Suggested Follow-up Questions */}
      {result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>{t.suggestedQuestions}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => onAskFollowUp(sq)}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-800 border border-slate-200 hover:border-orange-300 text-slate-700 transition-all text-left flex items-center justify-between gap-2 shadow-xs group"
              >
                <span>{sq}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
