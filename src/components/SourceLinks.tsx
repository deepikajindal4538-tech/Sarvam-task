import React from 'react';
import { ExternalLink, Phone, ShieldCheck, Clock, IndianRupee } from 'lucide-react';
import { OfficialLink, LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';

interface SourceLinksProps {
  officialLinks: OfficialLink[];
  helplines: { number: string; description: string; tollFree: boolean }[];
  fee: string;
  turnaroundTime: string;
  department: string;
  currentLang: LanguageCode;
}

export const SourceLinks: React.FC<SourceLinksProps> = ({
  officialLinks,
  helplines,
  fee,
  turnaroundTime,
  department,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="space-y-4 my-4">
      {/* Metrics Row: Official Fee and Turnaround Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 flex items-start gap-3">
          <div className="p-2 bg-orange-500 text-white rounded-lg shrink-0 mt-0.5">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wider">
              {t.feeTitle}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
              {fee}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              {t.turnaroundTitle}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
              {turnaroundTime}
            </p>
          </div>
        </div>
      </div>

      {/* Official Government Portals */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            {t.officialSourcesTitle}
          </h4>
        </div>

        <div className="space-y-2">
          {officialLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 gap-2 hover:bg-slate-100/80 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {link.url}
                </p>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs self-start sm:self-center shrink-0"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {department && (
          <p className="text-[11px] text-slate-500 mt-2.5 italic">
            Nodal Department: {department}
          </p>
        )}
      </div>

      {/* Official Helplines */}
      {helplines && helplines.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
              {t.helplineTitle}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {helplines.map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-amber-400 font-mono">
                      {h.number}
                    </span>
                    {h.tollFree && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {t.tollFree}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {h.description}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-emerald-600/20 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
