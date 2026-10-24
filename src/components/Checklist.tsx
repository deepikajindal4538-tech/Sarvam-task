import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, CheckCircle2, Info, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';

interface ChecklistItemData {
  id: string;
  name: string;
  mandatory: boolean;
  tip?: string;
}

interface ChecklistProps {
  items: ChecklistItemData[];
  serviceTitle: string;
  currentLang: LanguageCode;
}

export const Checklist: React.FC<ChecklistProps> = ({
  items,
  serviceTitle,
  currentLang,
}) => {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Reset checklist state when items or service changes
  useEffect(() => {
    setCheckedMap({});
    setHasCelebrated(false);
  }, [items, serviceTitle]);

  const toggleItem = (id: string) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      checkCompletion(next);
      return next;
    });
  };

  const checkCompletion = (state: Record<string, boolean>) => {
    const mandatoryItems = items.filter((i) => i.mandatory);
    const allMandatoryChecked =
      mandatoryItems.length > 0 && mandatoryItems.every((i) => state[i.id]);

    if (allMandatoryChecked && !hasCelebrated) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9933', '#FFFFFF', '#138808', '#1E3A8A'],
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setCheckedMap({});
    setHasCelebrated(false);
  };

  const totalMandatory = items.filter((i) => i.mandatory).length;
  const checkedMandatory = items.filter((i) => i.mandatory && checkedMap[i.id]).length;
  const progressPercent = totalMandatory > 0 ? Math.round((checkedMandatory / totalMandatory) * 100) : 100;
  const isAllMandatoryDone = totalMandatory > 0 && checkedMandatory === totalMandatory;

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5 shadow-sm my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {t.checklistTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.checklistSubtitle}
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
            {checkedMandatory} / {totalMandatory} {t.documentsReady}
          </span>
          {checkedMandatory > 0 && (
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
              title={t.resetAll}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full my-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Success Celebration Banner */}
      {isAllMandatoryDone && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.allReadyBanner}</span>
        </div>
      )}

      {/* Document Items List */}
      <div className="space-y-2 mt-2">
        {items.map((item) => {
          const isChecked = !!checkedMap[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-slate-500">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 animate-scale" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-800'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.mandatory ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 uppercase">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      Optional
                    </span>
                  )}
                </div>

                {item.tip && (
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-normal">
                    <Info className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{item.tip}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
