# 🇮🇳 BoloSaathi (बोलो साथी)

**Voice-first Indian Public Services Assistant UI built with React, TypeScript, and Node.js.**

BoloSaathi empowers citizens across India to ask questions about government public services in their mother tongue using speech or text, and receive official, verified guidance with interactive document checklists, step-by-step procedures, and direct links to government portals.

---

## 🌟 Key Features

1. **🎙️ Voice-First Architecture**:
   - **Tactile Microphone Button**: Centered, animated audio wave feedback (`AudioWaveform`) and pulsating rings when active.
   - **Real-Time Speech Recognition**: Integrates browser Web Speech API (`webkitSpeechRecognition`) with simulated voice fallback for unsupported browsers.
   - **Text-to-Speech (TTS)**: Built-in speech synthesis (`window.speechSynthesis`) to speak answers aloud in native Indian languages with play, pause, and waveform sync.
   - **Synthesized Web Audio Feedback**: Tactile audio cues (chimes) upon mic start/stop using native Web Audio API oscillators (zero external asset requests).

2. **🌐 8 Indian Languages Support**:
   - **Hindi (हिंदी)**
   - **English (English)**
   - **Tamil (தமிழ்)**
   - **Telugu (తెలుగు)**
   - **Bengali (বাংলা)**
   - **Marathi (मराठी)**
   - **Kannada (ಕನ್ನಡ)**
   - **Gujarati (ગુજરાતી)**
   - Instant language switching dynamically updates the UI, prompts, voice synthesis locale, and answer cards.

3. **📋 Interactive Document Checklist**:
   - Visual checklist for mandatory and optional required documents (e.g., Aadhaar, Electricity Bill, Income Certificate).
   - Real-time progress bar ("X of Y documents ready").
   - Rewarding celebratory confetti burst upon completing all required documents!

4. **📑 Comprehensive Public Service Knowledge Base (Mock Data)**:
   - **Aadhaar Card** (UIDAI): Address update, mobile link, PVC card, Head of Family.
   - **Ayushman Bharat** (PM-JAY): ₹5 Lakh cashless health cover, e-KYC, Golden Card.
   - **PM-KISAN Samman Nidhi**: ₹6,000/year DBT, land seeding, installment status.
   - **Ration Card / ONORC**: New card, family additions, nationwide grain collection.
   - **DigiLocker**: Legally valid Driving License, Vehicle RC, PAN, 10th/12th marksheets.
   - **Passport Seva**: Normal vs. Tatkaal, appointment scheduling, police verification.
   - **Voter ID (EPIC)**: Form 6 new enrollment, digital e-EPIC download.
   - **PM Awas Yojana (PMAY)**: Housing subsidy, geotagging, foundation/lintel DBT.

5. **🏛️ Official Sources & Helpline Badges**:
   - Direct links with verified `gov.in` badges (e.g. `myaadhaar.uidai.gov.in`, `beneficiary.nha.gov.in`).
   - One-tap dialer for 24x7 toll-free citizen helplines (`1947`, `14555`, `155261`, `1950`, `1967`).
   - Official fees & estimated government turnaround times.

6. **⚡ Minimal Dependency Stack**:
   - React 19 + TypeScript + Vite.
   - Tailwind CSS v4 for clean, high-contrast, accessible UI.
   - Lightweight Express Node.js backend.
   - `lucide-react` for iconography.
   - `canvas-confetti` for checklist completion celebrations.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Runs both the Node.js Express server (`http://localhost:3001`) and the React Vite client (`http://localhost:3000`) concurrently:
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
Starts the Node.js server which serves both the REST API and the compiled React application from `dist/`:
```bash
npm start
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📂 Project Structure

```
sarvam/
├── client/
│   ├── index.html              # HTML shell with Indian typography
│   └── src/
│       ├── components/
│       │   ├── Header.tsx          # Brand, language selector, sound toggle
│       │   ├── VoiceMic.tsx        # Voice-first centerpiece mic button
│       │   ├── AudioWaveform.tsx   # Animated voice frequency bars
│       │   ├── TextInputBar.tsx    # Text fallback search bar with chips
│       │   ├── AnswerCard.tsx      # Rich answer view with TTS player
│       │   ├── Checklist.tsx       # Interactive document checklist & confetti
│       │   ├── SourceLinks.tsx     # Official portals, helplines & metrics
│       │   ├── ServiceBrowser.tsx  # Scheme cards & category filter
│       │   └── InfoModal.tsx       # About BoloSaathi citizen dialog
│       ├── data/
│       │   └── translations.ts     # UI strings across 8 Indian languages
│       ├── services/
│       │   ├── speechService.ts    # Web Speech API + SpeechSynthesis + Tone SFX
│       │   └── apiService.ts       # Backend API client with offline fallback
│       ├── App.tsx                 # Root application controller
│       ├── index.css               # Tailwind & custom keyframe animations
│       └── main.tsx                # React DOM entry
├── server/
│   ├── src/
│   │   └── index.ts            # Express REST API & static file server
│   └── tsconfig.json
├── shared/
│   ├── types.ts                # Shared TypeScript definitions
│   ├── servicesData.ts         # Multilingual public service database
│   └── queryResolver.ts        # Multilingual keyword matching engine
├── package.json
└── vite.config.ts
```
