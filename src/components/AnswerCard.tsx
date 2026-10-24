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
  CheckSquare,
  ShieldCheck,
  UserCheck,
  IndianRupee,
  Clock,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { QueryResult, LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';
import { speechService } from '../services/speechService';
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
  const [activeTab, setActiveTab] = useState<'steps' | 'checklist' | 'sources'>('steps');
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
    setTimeout(() => setHasCopied(false), 2000);
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

  const totalDocs = result.checklist?.length || 0;

  return (
    <article className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-6 transition-all">
      {/* Top Header Card */}
      <div className="p-5 sm:p-7 md:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          {/* Category & Department metadata */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200 uppercase tracking-wider">
              {result.category.replace('_', ' ')}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{result.department.split(',')[0]}</span>
            </span>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio Listen Pill */}
            <button
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white shadow-rose-600/20'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Stop</span>
                  <AudioWaveform color="#ffffff" count={4} />
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Listen</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Copy Summary"
            >
              {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {result.title}
        </h2>

        {/* Takeaway Summary Banner */}
        <div className="mt-3.5 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/60 border-l-4 border-l-orange-500">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {result.summary}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'steps'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Application Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Documents Checklist</span>
            {totalDocs > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'checklist' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {totalDocs}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sources'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Portals & Helplines</span>
          </button>
        </div>
      </div>

      {/* Tab Contents Container */}
      <div className="p-5 sm:p-7 md:p-8">
        {/* Tab 1: Application Steps */}
        {activeTab === 'steps' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Fee & Timeline Metric Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex items-start gap-3.5">
                <div className="p-2.5 bg-orange-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                    Official Government Fee
                  </h4>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {result.fee}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3.5">
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Estimated Processing Time
                  </h4>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {result.turnaroundTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="space-y-3.5 pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Step-by-Step Application Guide
              </h3>
              <div className="space-y-3">
                {result.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50/40 transition-all flex items-start gap-4 shadow-2xs"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-600 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed break-words">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            {result.eligibility && result.eligibility.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Eligibility Criteria
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  {result.eligibility.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{crit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Document Checklist */}
        {activeTab === 'checklist' && (
          <div className="animate-fadeIn">
            <Checklist
              items={result.checklist}
              serviceTitle={result.title}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Tab 3: Official Portals & Helplines */}
        {activeTab === 'sources' && (
          <div className="animate-fadeIn">
            <SourceLinks
              officialLinks={result.officialLinks}
              helplines={result.helplines}
              fee={result.fee}
              turnaroundTime={result.turnaroundTime}
              department={result.department}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Common Questions & FAQs */}
        {result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 mb-3">
              <HelpCircle className="w-4 h-4 text-orange-600" />
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Frequently Asked Citizen Questions
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onAskFollowUp(sq)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-200/70 text-slate-700 hover:text-orange-950 font-medium text-xs sm:text-sm transition-all flex items-center justify-between gap-2 text-left group shadow-2xs"
                >
                  <span className="line-clamp-2 leading-snug">{sq}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
