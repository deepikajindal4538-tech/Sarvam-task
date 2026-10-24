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
    <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm max-w-4xl mx-auto my-6 overflow-hidden transition-all">
      {/* Top Header Card */}
      <div className="p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 uppercase tracking-wider">
              {result.category.replace('_', ' ')}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">
              {result.department.split(',')[0]}
            </span>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
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

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Copy"
            >
              {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {result.title}
        </h2>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {result.summary}
        </p>

        {/* Clean Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'steps'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Application Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Documents Checklist</span>
            {totalDocs > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'checklist' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {totalDocs}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sources'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Portals & Helplines</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-7">
        {/* Tab 1: Application Steps & Overview */}
        {activeTab === 'steps' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Quick Fee & Timeline Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100">
                <span className="text-[11px] font-bold text-orange-900 uppercase tracking-wider">
                  Government Fee
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  {result.fee}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                  Processing Time
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  {result.turnaroundTime}
                </p>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Step-by-Step Procedure
              </h3>
              {result.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Eligibility */}
            {result.eligibility && result.eligibility.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Eligibility Criteria
                </h3>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  {result.eligibility.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{crit}</span>
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

        {/* Suggested Questions */}
        {result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Common Questions:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {result.suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskFollowUp(sq)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-800 text-slate-700 font-medium transition-colors flex items-center gap-1 group text-left"
                >
                  <span>{sq}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
