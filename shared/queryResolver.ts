import { MOCK_SERVICES } from './servicesData.js';
import { LanguageCode, PublicService, QueryResult, StepItem, ChecklistItem, Helpline } from './types.js';

// Keyword dictionary for cross-language and colloquial matching
const KEYWORD_MAP: Record<string, string[]> = {
  'aadhaar-update': [
    'aadhaar', 'aadhar', 'adhar', 'uidai', 'myaadhaar', 'address', 'pata', 'update', 
    'mobile number', 'pvc', 'seva kendra', 'आधार', 'पता', 'एड्रेस', 'मोबाइल',
    'ஆதார்', 'முகவரி', 'ఆధార్', 'చిరునామా', 'আধার', 'ঠিকানা', 'पत्ता'
  ],
  'ayushman-bharat': [
    'ayushman', 'pmjay', 'health', 'hospital', 'medical', 'bima', 'insurance', 'card', 
    'golden card', '5 lakh', 'treatment', 'cashless', 'senior 70', 'आयुष्मान', 'इलाज', 'अस्पताल', 
    'बीमा', 'गोल्डन कार्ड', 'ஆயுஷ்மான்', 'மருத்துவம்', 'ఆరోగ్య', 'স্বাস্থ্য'
  ],
  'pm-kisan': [
    'kisan', 'farmer', 'pmkisan', '6000', 'installment', 'kist', 'ekyc', 'land seeding', 
    'dbt', 'samman nidhi', 'kheti', 'किसान', 'किस्त', 'सम्मान निधि', 'ईकेवाईसी', 
    'जमीन', 'விவசாயி', 'రైతు', 'কিষাণ', 'शेतकरी'
  ],
  'ration-card': [
    'ration', 'rashan', 'onorc', 'quota', 'grain', 'wheat', 'rice', 'fps', 'pds', 
    'khadyann', 'bpl', 'aay', 'राशन', 'अनाज', 'राशन कार्ड', 'गेहूं', 'चावल', 
    'ரேஷன்', 'రేషన్', 'রেশন', 'रेशन'
  ],
  'digilocker': [
    'digilocker', 'driving license', 'dl', 'rc', 'vehicle', 'pan', 'pan card', 'cbse', 
    'marksheet', 'certificate', 'wallet', 'डिजिलॉकर', 'ड्राइविंग लाइसेंस', 'आरसी', 
    'पैन कार्ड', 'मार्कशीट', 'டிஜிலாக்கர்', 'డిజిలాకర్'
  ],
  'passport-seva': [
    'passport', 'psk', 'tatkaal', 'tatkal', 'visa', 'police verification', 'travel', 
    'foreign', 'पासपोर्ट', 'विदेश', 'तत्काल', 'போர்ட்', 'పాస్‌పోర్ట్', 'পাসপোর্ট'
  ],
  'voter-id': [
    'voter', 'election', 'epic', 'form 6', 'vote', 'polling', 'chunav', 'voting card', 
    'matdata', 'वोटर', 'मतदाता', 'पहचान पत्र', 'चुनाव', 'வாக்காளர்', 'ఓటరు', 'ভোটার'
  ],
  'pm-awas': [
    'awas', 'housing', 'home', 'makan', 'ghar', 'pucca', 'subsidy', 'pmay', 'gramin', 
    'urban', 'आवास', 'मकान', 'घर', 'सब्सिडी', 'வீடு', 'ఇల్లు', 'বাড়ি'
  ],
};

export function resolveServiceQuery(query: string, lang: LanguageCode = 'en'): QueryResult {
  const cleanQuery = query.toLowerCase().trim();

  let bestMatch: PublicService | null = null;
  let bestScore = 0;

  for (const service of MOCK_SERVICES) {
    let score = 0;
    const keywords = KEYWORD_MAP[service.id] || [];

    // Check tags
    for (const tag of service.tags) {
      if (cleanQuery.includes(tag.toLowerCase())) {
        score += 3.5;
      }
    }

    // Check keyword map
    for (const kw of keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 4.5;
      }
    }

    // Check titles across all languages
    for (const rawTitle of Object.values(service.title)) {
      const titleStr = String(rawTitle);
      const words = titleStr.toLowerCase().split(/\s+/);
      for (const w of words) {
        if (w.length > 2 && cleanQuery.includes(w)) {
          score += 2.0;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = service;
    }
  }

  // If no match meets confidence threshold, NEVER default to Aadhaar! Return verified notice.
  if (!bestMatch || bestScore < 3.0) {
    return {
      serviceId: 'unverified-query',
      category: 'advisory',
      title: 'Information Could Not Be Verified',
      summary: `We could not verify official government information for "${query}" in our public services directory. BoloSaathi strictly avoids inventing fees, deadlines, or rules. Please consult the National Portal of India (india.gov.in) or call Helpline 1947.`,
      spokenText: 'This information could not be verified in official public service records. Please check the National Portal of India at india.gov.in.',
      department: 'National Citizen Advisory',
      officialLinks: [
        {
          name: 'National Portal of India',
          url: 'https://india.gov.in',
          badge: 'Official Portal (gov.in)',
          isOfficial: true,
        },
      ],
      helplines: [
        {
          number: '1947',
          description: 'National Citizen Helpline',
          tollFree: true,
        },
      ],
      eligibility: ['Information could not be verified in official records.'],
      fee: 'Information not verified',
      turnaroundTime: 'Not verified',
      steps: [
        {
          stepNumber: 1,
          title: 'Consult Official National Portal',
          description: 'Visit https://india.gov.in to search the central and state schemes directory.',
        },
        {
          stepNumber: 2,
          title: 'Contact Citizen Help Centre',
          description: 'Dial toll-free 1947 or visit your nearest Common Service Centre (CSC).',
        },
      ],
      checklist: [
        {
          id: 'unverified_check',
          name: 'Official government gazette or department notification',
          mandatory: true,
          tip: 'Always verify source authenticity before applying',
        },
      ],
      suggestedQuestions: [
        'How to update address in Aadhaar card online?',
        'How to apply for Ayushman Bharat 5 lakh health card?',
        'How to check PM-KISAN installment status?',
      ],
      matchScore: 0,
    };
  }

  // Localize content to requested language with English fallback
  const title = bestMatch.title[lang] || bestMatch.title['en'] || Object.values(bestMatch.title)[0];
  const summary = bestMatch.shortDescription[lang] || bestMatch.shortDescription['en'] || Object.values(bestMatch.shortDescription)[0];
  const spokenText = bestMatch.spokenSummary[lang] || bestMatch.spokenSummary['en'] || summary;
  const dept = bestMatch.department[lang] || bestMatch.department['en'] || Object.values(bestMatch.department)[0];
  const fee = bestMatch.fee[lang] || bestMatch.fee['en'] || Object.values(bestMatch.fee)[0];
  const turnaroundTime = bestMatch.turnaroundTime[lang] || bestMatch.turnaroundTime['en'] || Object.values(bestMatch.turnaroundTime)[0];
  const eligibility = bestMatch.eligibility[lang] || bestMatch.eligibility['en'] || [];

  const steps = bestMatch.steps.map((s: StepItem) => ({
    stepNumber: s.stepNumber,
    title: s.title[lang] || s.title['en'] || Object.values(s.title)[0],
    description: s.description[lang] || s.description['en'] || Object.values(s.description)[0],
  }));

  const checklist = bestMatch.checklist.map((c: ChecklistItem) => ({
    id: c.id,
    name: c.name[lang] || c.name['en'] || Object.values(c.name)[0],
    mandatory: c.mandatory,
    tip: c.tip ? (c.tip[lang] || c.tip['en'] || Object.values(c.tip)[0]) : undefined,
  }));

  const helplines = bestMatch.helplines.map((h: Helpline) => ({
    number: h.number,
    description: h.description[lang] || h.description['en'] || Object.values(h.description)[0],
    tollFree: h.tollFree,
  }));

  const suggestedQuestions = bestMatch.suggestedQuestions[lang] || bestMatch.suggestedQuestions['en'] || [];

  return {
    serviceId: bestMatch.id,
    category: bestMatch.category,
    title,
    summary,
    spokenText,
    department: dept,
    officialLinks: [bestMatch.officialPortal],
    helplines,
    eligibility,
    fee,
    turnaroundTime,
    steps,
    checklist,
    suggestedQuestions,
    matchScore: bestScore,
  };
}
