export type LanguageCode = 'hi' | 'en' | 'ta' | 'te' | 'bn' | 'mr' | 'kn' | 'gu';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  speechCode: string; // BCP 47 tag e.g. 'hi-IN'
  flag: string;
  greeting: string;
  exampleQuery: string;
}

export interface ChecklistItem {
  id: string;
  name: Record<string, string>;
  mandatory: boolean;
  tip?: Record<string, string>;
}

export interface StepItem {
  stepNumber: number;
  title: Record<string, string>;
  description: Record<string, string>;
}

export interface OfficialLink {
  name: string;
  url: string;
  badge?: string;
  isOfficial: boolean;
}

export interface Helpline {
  number: string;
  description: Record<string, string>;
  tollFree: boolean;
}

export interface PublicService {
  id: string;
  category: 
    | 'identity' 
    | 'healthcare' 
    | 'agriculture' 
    | 'food_civil_supplies' 
    | 'documents' 
    | 'travel' 
    | 'elections' 
    | 'housing' 
    | 'pension'
    | 'welfare';
  title: Record<string, string>;
  shortDescription: Record<string, string>;
  department: Record<string, string>;
  officialPortal: OfficialLink;
  helplines: Helpline[];
  eligibility: Record<string, string[]>;
  fee: Record<string, string>;
  turnaroundTime: Record<string, string>;
  steps: StepItem[];
  checklist: ChecklistItem[];
  tags: string[];
  spokenSummary: Record<string, string>;
  suggestedQuestions: Record<string, string[]>;
}

export interface QueryRequest {
  query: string;
  language: LanguageCode;
  isVoice?: boolean;
}

export interface QueryResult {
  serviceId: string;
  category: string;
  title: string;
  summary: string;
  spokenText: string;
  department: string;
  officialLinks: OfficialLink[];
  helplines: { number: string; description: string; tollFree: boolean }[];
  eligibility: string[];
  fee: string;
  turnaroundTime: string;
  steps: { stepNumber: number; title: string; description: string }[];
  checklist: { id: string; name: string; mandatory: boolean; tip?: string }[];
  suggestedQuestions: string[];
  matchScore: number;
}
