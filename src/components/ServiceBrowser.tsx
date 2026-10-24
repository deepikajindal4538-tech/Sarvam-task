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
import { TRANSLATIONS } from '../../data/translations';

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
    <div className="max-w-5xl mx-auto px-4 my-8">
      {/* Category Pills */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span>{t.popularServices}</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {filteredServices.length} Schemes
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-xs ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 uppercase tracking-wider">
                    {service.category.replace('_', ' ')}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2.5 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {title}
                </h4>

                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                  {desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Govt portal link verified</span>
                <span className="font-semibold text-orange-600">Ask now →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
