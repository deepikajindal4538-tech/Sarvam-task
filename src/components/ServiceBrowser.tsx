import React, { useState } from 'react';
import {
  FileText,
  HeartPulse,
  Sprout,
  ShoppingBag,
  FolderLock,
  Plane,
  Vote,
  Home,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { MOCK_SERVICES } from '../../shared/servicesData';
import { LanguageCode } from '../../shared/types';
import { TRANSLATIONS } from '../data/translations';

interface ServiceBrowserProps {
  currentLang: LanguageCode;
  onSelectService: (query: string) => void;
}

export const ServiceBrowser: React.FC<ServiceBrowserProps> = ({
  currentLang,
  onSelectService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const categories = [
    { id: 'all', label: t.allCategories, icon: Sparkles },
    { id: 'identity', label: 'Aadhaar & Identity', icon: FileText },
    { id: 'healthcare', label: 'Health (Ayushman)', icon: HeartPulse },
    { id: 'agriculture', label: 'Farmer (PM-Kisan)', icon: Sprout },
    { id: 'food_civil_supplies', label: 'Ration & Food', icon: ShoppingBag },
    { id: 'documents', label: 'DigiLocker & DL', icon: FolderLock },
    { id: 'travel', label: 'Passport Seva', icon: Plane },
    { id: 'elections', label: 'Voter ID (EPIC)', icon: Vote },
    { id: 'housing', label: 'Housing (PMAY)', icon: Home },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? MOCK_SERVICES
      : MOCK_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full my-3">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {filteredServices.map((service) => {
          const title = service.title[currentLang] || service.title['en'];
          const desc = service.shortDescription[currentLang] || service.shortDescription['en'];
          const sampleQuery =
            (service.suggestedQuestions[currentLang] || service.suggestedQuestions['en'] || [])[0] ||
            title;

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(sampleQuery)}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {service.category.replace('_', ' ')}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-600 transition-colors" />
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 group-hover:text-orange-600 transition-colors">
                  {title}
                </h4>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified .gov.in</span>
                <span className="font-semibold text-orange-600">Select →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
