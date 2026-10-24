import React from 'react';
import { ExternalLink, Phone, ShieldCheck } from 'lucide-react';
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
  department,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="space-y-4">
      {/* Official Government Portals */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Verified Government Portals
          </h4>
        </div>

        <div className="space-y-2">
          {officialLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 gap-2 hover:bg-slate-100/70 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                      Official .gov.in
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
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
          <p className="text-[11px] text-slate-400 mt-2 italic">
            Department: {department}
          </p>
        )}
      </div>

      {/* Official Helplines */}
      {helplines && helplines.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Phone className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Citizen Support Helplines
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {helplines.map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-50/70 border border-slate-100 hover:border-orange-200 transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 group-hover:text-orange-600 font-mono">
                      {h.number}
                    </span>
                    {h.tollFree && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        Toll-Free
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {h.description}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-slate-100 group-hover:bg-orange-600 group-hover:text-white text-slate-500 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
