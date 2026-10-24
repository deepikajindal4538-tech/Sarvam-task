import { Language, PublicService } from './types.js';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    speechCode: 'en-IN',
    flag: '🇮🇳',
    greeting: 'Namaste! I am BoloSaathi. How can I assist you with public services today?',
    exampleQuery: 'How to update address in Aadhaar card?',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    speechCode: 'hi-IN',
    flag: '🇮🇳',
    greeting: 'नमस्ते! मैं बोलो साथी हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?',
    exampleQuery: 'आधार कार्ड में पता कैसे बदलें?',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechCode: 'ta-IN',
    flag: '🇮🇳',
    greeting: 'வணக்கம்! நான் போலோ சாதி. பொது சேவைகளில் உங்களுக்கு நான் எவ்வாறு உதவ முடியும்?',
    exampleQuery: 'ஆயுஷ்மான் பாரத் கார்டுக்கு விண்ணப்பிப்பது எப்படி?',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechCode: 'te-IN',
    flag: '🇮🇳',
    greeting: 'నమస్కారం! నేను బోలో సాథీని. ప్రజా సేవలలో మీకు ఎలా సహాయపడగలను?',
    exampleQuery: 'పీఎం కిసాన్ ఈ-కేవైసీ ఎలా చేయాలి?',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechCode: 'bn-IN',
    flag: '🇮🇳',
    greeting: 'নমস্কার! আমি বলো সাথী। জনসেবায় আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    exampleQuery: 'রেশন কার্ডে নতুন নাম কীভাবে যোগ করবেন?',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    speechCode: 'mr-IN',
    flag: '🇮🇳',
    greeting: 'नमस्कार! मी बोलो साथी आहे. सरकारी सेवांमध्ये आज मी तुम्हाला कशी मदत करू शकतो?',
    exampleQuery: 'आधार कार्डवर पत्ता कसा बदलायचा?',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechCode: 'kn-IN',
    flag: '🇮🇳',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು ಬೋಲೋ ಸಾಥಿ. ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳಲ್ಲಿ ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    exampleQuery: 'ರೇಷನ್ ಕಾರ್ಡ್ ಹೊಸ ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು?',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    speechCode: 'gu-IN',
    flag: '🇮🇳',
    greeting: 'નમસ્તે! હું બોલો સાથી છું. સરકારી સેવાઓમાં હું તમને કેવી રીતે મદદ કરી શકું?',
    exampleQuery: 'આયુષ્માન ભારત કાર્ડ માટે કેવી રીતે અરજી કરવી?',
  },
];

export const MOCK_SERVICES: PublicService[] = [
  {
    id: 'aadhaar-update',
    category: 'identity',
    title: {
      en: 'Aadhaar Card Address & Details Update',
      hi: 'आधार कार्ड में पता और विवरण अपडेट',
      ta: 'ஆதார் அட்டை முகவரி & விவரங்கள் புதுப்பித்தல்',
      te: 'ఆధార్ కార్డు చిరునామా & వివరాల అప్‌డేట్',
      bn: 'আধার কার্ডের ঠিকানা এবং তথ্য আপডেট',
      mr: 'आधार कार्ड पत्ता आणि तपशील अपडेट',
      kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ವಿಳಾಸ ಮತ್ತು ವಿವರಗಳ ನವೀಕರಣ',
      gu: 'આધાર કાર્ડ સરનામું અને વિગતો અપડેટ',
    },
    shortDescription: {
      en: 'Update your residential address, mobile number, or photo in your UIDAI Aadhaar record.',
      hi: 'यूआईडीएआई आधार रिकॉर्ड में अपना आवासीय पता, मोबाइल नंबर या फोटो अपडेट करें।',
      ta: 'உங்கள் ஆதார் பதிவில் வசிப்பிட முகவரி அல்லது தொலைபேசி எண்ணைப் புதுப்பிக்கவும்.',
      te: 'మీ ఆధార్ రికార్డులో నివాస చిరునామా లేదా మొబైల్ నంబర్‌ను నవీకరించండి.',
      bn: 'আপনার আধার রেকর্ডে ঠিকানার প্রমাণ অথবা মোবাইল নম্বর সংশোধন করুন।',
      mr: 'तुमच्या आधार कार्डवर निवासी पत्ता किंवा मोबाईल क्रमांक सहज अपडेट करा.',
      kn: 'ನಿಮ್ಮ ಆಧಾರ್ ದಾಖಲೆಯಲ್ಲಿ ವಿಳಾಸ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನವೀಕರಿಸಿ.',
      gu: 'તમારા આધાર કાર્ડમાં રહેઠાણનું સરનામું અથવા મોબાઈલ નંબર સુધારો.',
    },
    department: {
      en: 'Unique Identification Authority of India (UIDAI), Ministry of Electronics & IT',
      hi: 'भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI), इलेक्ट्रॉनिक्स और आईटी मंत्रालय',
    },
    officialPortal: {
      name: 'UIDAI myAadhaar Portal',
      url: 'https://myaadhaar.uidai.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '1947',
        description: {
          en: 'UIDAI 24x7 Toll-Free Citizen Helpline (Available in 12 languages)',
          hi: 'UIDAI 24x7 टोल-फ्री हेल्पलाइन (12 भाषाओं में उपलब्ध)',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Must possess an existing 12-digit Aadhaar number',
        'Registered mobile number is required for online OTP address updates',
        'For biometric/photo/mobile updates, physical visit to an Aadhaar Seva Kendra is mandatory',
      ],
      hi: [
        'मौजूदा 12 अंकों का आधार नंबर होना आवश्यक है',
        'ऑनलाइन ओटीपी से पता अपडेट के लिए मोबाइल नंबर लिंक होना चाहिए',
        'बायोमेट्रिक, फोटो या मोबाइल नंबर बदलने के लिए आधार सेवा केंद्र जाना अनिवार्य है',
      ],
    },
    fee: {
      en: '₹50 for Demographic / Address update; ₹100 for Biometric update (UIDAI official rates)',
      hi: 'जनसांख्यिकीय/पता अपडेट के लिए ₹50; बायोमेट्रिक अपडेट के लिए ₹100',
    },
    turnaroundTime: {
      en: 'Typically 5 to 15 working days; e-Aadhaar downloadable immediately upon verification',
      hi: 'आमतौर पर 5 से 15 कार्य दिवस; सत्यापन के बाद ई-आधार तुरंत डाउनलोड किया जा सकता है',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Log in to myAadhaar Portal',
          hi: 'myAadhaar पोर्टल पर लॉग इन करें',
        },
        description: {
          en: 'Visit myaadhaar.uidai.gov.in, click Login, enter your 12-digit Aadhaar number and OTP received on your linked mobile.',
          hi: 'myaadhaar.uidai.gov.in पर जाएं, लॉगिन पर क्लिक करें और अपने 12 अंकों के आधार नंबर और ओटीपी से लॉगिन करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Select Address Update Service',
          hi: 'पता अपडेट विकल्प चुनें',
        },
        description: {
          en: 'Choose "Update Address in Aadhaar Online" or select "Head of Family (HoF) based update" if you lack address proof in your name.',
          hi: '"Update Address in Aadhaar Online" चुनें या यदि आपके नाम पर प्रमाण नहीं है तो परिवार के मुखिया (HoF) आधारित विकल्प चुनें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Enter New Address & Upload Valid Proof',
          hi: 'नया पता दर्ज करें और वैध प्रमाण अपलोड करें',
        },
        description: {
          en: 'Fill in Pin code, Village/Town, District, and upload a clear PDF/JPEG of a valid Proof of Address document (max 2MB).',
          hi: 'पिन कोड, शहर/गाँव, जिला भरें और पते के प्रमाण (बिजली बिल, बैंक पासबुक आदि) की स्पष्ट कॉपी अपलोड करें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Pay ₹50 Fee and Note URN',
          hi: '₹50 शुल्क का भुगतान करें और URN नोट करें',
        },
        description: {
          en: 'Complete payment via UPI or Debit Card. Download the acknowledgment slip with your 14-digit Update Request Number (URN) to track status.',
          hi: 'UPI या कार्ड से ₹50 का ऑनलाइन भुगतान करें और 14 अंकों का URN नंबर नोट कर लें जिससे आप स्टेटस ट्रैक कर सकें।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_aadhaar_orig',
        name: {
          en: 'Original 12-digit Aadhaar Number or e-Aadhaar copy',
          hi: 'मूल 12 अंकों का आधार नंबर या ई-आधार प्रति',
        },
        mandatory: true,
        tip: {
          en: 'Ensure your mobile is active to receive the 6-digit OTP',
          hi: 'सुनिश्चित करें कि ओटीपी प्राप्त करने के लिए आपका मोबाइल चालू है',
        },
      },
      {
        id: 'doc_poa',
        name: {
          en: 'Valid Proof of Address (Electricity bill, Bank passbook, Rent agreement, or Voter ID)',
          hi: 'वैध पते का प्रमाण (बिजली बिल, बैंक पासबुक, रेंट एग्रीमेंट या वोटर आईडी)',
        },
        mandatory: true,
        tip: {
          en: 'Utility bills must be less than 3 months old with matching name',
          hi: 'बिजली या पानी का बिल 3 महीने से पुराना नहीं होना चाहिए',
        },
      },
      {
        id: 'doc_mobile_active',
        name: {
          en: 'Linked Mobile Phone for OTP authentication',
          hi: 'ओटीपी सत्यापन के लिए लिंक किया गया मोबाइल फोन',
        },
        mandatory: true,
      },
      {
        id: 'doc_hof_consent',
        name: {
          en: 'Self-declaration letter (Only if applying via Head of Family without own proof)',
          hi: 'स्व-घोषणा पत्र (केवल तब जब परिवार के मुखिया के पते पर आवेदन कर रहे हों)',
        },
        mandatory: false,
      },
    ],
    tags: ['aadhaar', 'uidai', 'address', 'identity', 'myaadhaar', 'update', 'mobile', 'आधार', 'पहचान पत्र'],
    spokenSummary: {
      en: 'To update your Aadhaar address online, visit myaadhaar.uidai.gov.in with your linked mobile number and a valid address proof like an electricity bill or bank passbook. The official fee is ₹50 and takes 5 to 15 days.',
      hi: 'आधार में ऑनलाइन पता बदलने के लिए myaadhaar.uidai.gov.in पर जाएं। आपके पास लिंक किया हुआ मोबाइल नंबर और बिजली बिल या बैंक पासबुक जैसा पते का प्रमाण होना चाहिए। आधिकारिक शुल्क ₹50 है और 5 से 15 दिन लगते हैं।',
    },
    suggestedQuestions: {
      en: [
        'Can I update Aadhaar without documents using Head of Family?',
        'How to link mobile number to Aadhaar card?',
        'How to order a PVC Aadhaar card?',
      ],
      hi: [
        'क्या बिना पते के प्रमाण के परिवार के मुखिया की मदद से पता बदल सकता है?',
        'आधार में मोबाइल नंबर कैसे जोड़ें?',
        'पीवीसी आधार कार्ड कैसे मंगवाएं?',
      ],
    },
  },
  {
    id: 'ayushman-bharat',
    category: 'healthcare',
    title: {
      en: 'Ayushman Bharat PM-JAY ₹5 Lakh Free Health Coverage Card',
      hi: 'आयुष्मान भारत PM-JAY ₹5 लाख मुफ्त स्वास्थ्य बीमा कार्ड',
      ta: 'ஆயுஷ்மான் பாரத் ₹5 லட்சம் இலவச மருத்துவக் காப்பீட்டு அட்டை',
      te: 'ఆయుష్మాన్ భారత్ ₹5 లక్షల ఉచిత ఆరోగ్య కార్డు',
      bn: 'আয়ুষ্মান ভারত ₹৫ লাখ বিনামূল্যের স্বাস্থ্য কার্ড',
      mr: 'आयुष्मान भारत ₹५ लाख मोफत आरोग्य कार्ड',
      kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ₹5 ಲಕ್ಷ ಉಚಿತ ಆರೋಗ್ಯ ಕಾರ್ಡ್',
      gu: 'આયુષ્માન ભારત ₹5 લાખ મફત સ્વાસ્થ્ય વીમા કાર્ડ',
    },
    shortDescription: {
      en: 'Get cashless hospitalization coverage of up to ₹5 lakh per family per year across empaneled public & private hospitals.',
      hi: 'सूचीबद्ध सरकारी और निजी अस्पतालों में प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस इलाज प्राप्त करें।',
      ta: 'அரசு மற்றும் தனியார் மருத்துவமனைகளில் குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை இலவச சிகிச்சை.',
      te: 'ప్రభుత్వ మరియు ప్రైవేట్ ఆసుపత్రులలో కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత చికిత్స.',
      bn: 'তালিকাভুক্ত হাসপাতালে প্রতি বছর পরিবার পিছু ₹৫ লক্ষ টাকা পর্যন্ত নগদহীন চিকিৎসা।',
      mr: 'सरकारी आणि खासगी रुग्णालयांमध्ये दरवर्षी कुटुंबासाठी ₹५ लाखांपर्यंत मोफत कॅशलेस उपचार.',
      kn: 'ವರ್ಷಕ್ಕೆ ಕುಟುಂಬಕ್ಕೆ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದು ರಹಿತ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ.',
      gu: 'સરકારી અને ખાનગી હોસ્પિટલોમાં વાર્ષિક ₹5 લાખ સુધીની કેશલેસ સારવાર મેળવો.',
    },
    department: {
      en: 'National Health Authority (NHA), Ministry of Health and Family Welfare',
      hi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA), स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
    },
    officialPortal: {
      name: 'NHA Ayushman Bharat (PM-JAY) Portal',
      url: 'https://beneficiary.nha.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '14555',
        description: {
          en: 'Ayushman Bharat 24x7 National Toll-Free Helpline',
          hi: 'आयुष्मान भारत 24x7 राष्ट्रीय टोल-फ्री हेल्पलाइन',
        },
        tollFree: true,
      },
      {
        number: '1800-111-565',
        description: {
          en: 'NHA Patient Redressal & Hospital Support',
          hi: 'मरीज़ सहायता व अस्पताल निवारण हेल्पलाइन',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Families listed in SECC 2011 database (Rural D1-D7 criteria or Urban 11 occupational categories)',
        'Active Ration Card holders (NFSA priority households)',
        'All Senior Citizens aged 70 and above (irrespective of income under Ayushman Vaya Vandana)',
      ],
      hi: [
        'SECC 2011 डेटाबेस में सूचीबद्ध ग्रामीण और शहरी पात्र परिवार',
        'सक्रिय राशन कार्ड धारक (NFSA प्राथमिकता परिवार)',
        '70 वर्ष या उससे अधिक आयु के सभी वरिष्ठ नागरिक (आयुष्मान वय वंदना के तहत आय सीमा नहीं)',
      ],
    },
    fee: {
      en: '100% Free of Cost at Government Hospitals and CSC centers',
      hi: 'सरकारी अस्पतालों और जन सेवा केंद्रों पर पूरी तरह मुफ़्त (₹0)',
    },
    turnaroundTime: {
      en: 'Instant digital card generation upon e-KYC approval (typically within 24 to 48 hours)',
      hi: 'e-KYC अनुमोदन के बाद तत्काल डिजिटल कार्ड (सामान्यतः 24 से 48 घंटे में)',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Check Eligibility Online',
          hi: 'ऑनलाइन पात्रता की जाँच करें',
        },
        description: {
          en: 'Visit beneficiary.nha.gov.in, select "Beneficiary" login, enter your mobile number and verify via OTP.',
          hi: 'beneficiary.nha.gov.in पर जाएं, "Beneficiary" चुनें, मोबाइल नंबर डालें और OTP से लॉगिन करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Search Family by State & Ration Card or Aadhaar',
          hi: 'राशन कार्ड या आधार से परिवार खोजें',
        },
        description: {
          en: 'Select your State, Scheme (PMJAY), and search using your Ration Card number, Family ID, or Aadhaar number.',
          hi: 'अपना राज्य और योजना चुनें, फिर राशन कार्ड नंबर या आधार नंबर दर्ज कर परिवार खोजें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Complete e-KYC Verification',
          hi: 'e-KYC सत्यापन पूरा करें',
        },
        description: {
          en: 'Click on the e-KYC icon next to the member name, verify with Aadhaar OTP or Facial Authentication via Ayushman App.',
          hi: 'सदस्य के नाम के पास e-KYC पर क्लिक करें और आधार OTP या आयुष्मान ऐप से चेहरा स्कैन करके सत्यापन करें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Download Ayushman Card (Golden Card)',
          hi: 'आयुष्मान कार्ड (गोल्डन कार्ड) डाउनलोड करें',
        },
        description: {
          en: 'Once verified, click "Download Card" to save the PDF on your phone or print it for hospital admissions.',
          hi: 'सत्यापन के तुरंत बाद "Download Card" पर क्लिक करें और कार्ड को फोन में सहेजें या प्रिंट निकालें।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_aadhaar_all',
        name: {
          en: 'Aadhaar Card of each family member to be enrolled',
          hi: 'नामांकित किए जाने वाले प्रत्येक परिवार के सदस्य का आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_ration_card',
        name: {
          en: 'Ration Card (NFSA) or Family Samagra ID / Parivar Pehchan Patra',
          hi: 'राशन कार्ड (NFSA) या परिवार समग्र आईडी / परिवार पहचान पत्र',
        },
        mandatory: true,
      },
      {
        id: 'doc_active_mobile',
        name: {
          en: 'Active Mobile number linked to Aadhaar for OTP',
          hi: 'ओटीपी के लिए आधार से जुड़ा चालू मोबाइल नंबर',
        },
        mandatory: true,
      },
      {
        id: 'doc_age_proof_senior',
        name: {
          en: 'Age Proof for Senior Citizens (70+ scheme enrollment)',
          hi: '70+ वर्ष के वरिष्ठ नागरिकों के लिए आयु प्रमाण पत्र',
        },
        mandatory: false,
      },
    ],
    tags: ['health', 'ayushman', 'pmjay', 'hospital', 'cashless', 'medical', 'insurance', 'nha', 'इलाज', 'स्वास्थ्य', 'आयुष्मान'],
    spokenSummary: {
      en: 'Ayushman Bharat provides ₹5 lakh per year free cashless hospital treatment. You can check eligibility and download your Ayushman Golden Card at beneficiary.nha.gov.in using your Ration Card and Aadhaar OTP. The card is 100% free.',
      hi: 'आयुष्मान भारत योजना प्रति वर्ष ₹5 लाख का मुफ्त कैशलेस इलाज प्रदान करती है। आप beneficiary.nha.gov.in पर जाकर राशन कार्ड और आधार ओटीपी से अपनी पात्रता जांचकर गोल्डन कार्ड तुरंत डाउनलोड कर सकते हैं। यह कार्ड पूरी तरह मुफ्त है।',
    },
    suggestedQuestions: {
      en: [
        'How to find nearby Ayushman Bharat empaneled hospitals?',
        'Can people above 70 years get Ayushman Card without income criteria?',
        'What diseases and treatments are covered under PM-JAY?',
      ],
      hi: [
        'नज़दीकी आयुष्मान भारत अस्पताल कैसे खोजें?',
        'क्या 70 साल से ऊपर के सभी बुजुर्गों को बिना आय सीमा के कार्ड मिलेगा?',
        'आयुष्मान कार्ड में कौन-कौन सी बीमारियों का इलाज शामिल है?',
      ],
    },
  },
  {
    id: 'pm-kisan',
    category: 'agriculture',
    title: {
      en: 'PM-KISAN Samman Nidhi Yojana (₹6,000 / Year)',
      hi: 'प्रधानमंत्री किसान सम्मान निधि योजना (₹6,000 / वर्ष)',
      ta: 'பிரதான் மந்திரி கிசான் சம்மான் நிதி (ஆண்டுக்கு ₹6,000)',
      te: 'పీఎం కిసాన్ సమ్మాన్ నిధి పథకం (సంవత్సరానికి ₹6,000)',
      bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি প্রকল্প (বছরে ₹৬,০০০)',
      mr: 'पंतप्रधान किसान सन्मान निधी योजना (वार्षिक ₹६,०००)',
      kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (ವರ್ಷಕ್ಕೆ ₹6,000)',
      gu: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ યોજના (વાર્ષિક ₹6,000)',
    },
    shortDescription: {
      en: 'Direct income support of ₹6,000 per year transferred into bank accounts of eligible farmer families in 3 installments of ₹2,000 each.',
      hi: 'पात्र किसान परिवारों के बैंक खातों में ₹2,000 की 3 किस्तों में प्रति वर्ष ₹6,000 की सीधी आर्थिक सहायता।',
      ta: 'விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 நிதி உதவி 3 தவணைகளில் தலா ₹2,000 நேரடியாக வங்கிக் கணக்கில்.',
      te: 'రైతులకు ప్రతి సంవత్సరం ₹6,000 ఆర్థిక సాయం 3 వాయిదాలలో నేరుగా బ్యాంక్ ఖాతాలో జమ.',
      bn: 'কৃষকদের ব্যাঙ্ক অ্যাকাউন্টে বছরে তিনটি কিস্তিতে মোট ₹৬,০০০ সরাসরি অনুদান।',
      mr: 'शेतकऱ्यांच्या बँक खात्यात दरवर्षी ३ हप्त्यांमध्ये ₹६,००० थेट जमा.',
      kn: 'ಅರ್ಹ ರೈತರಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ಸಹಾಯಧನವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ.',
      gu: 'ખેડૂતોના બેંક ખાતામાં વાર્ષિક ₹6,000 ની સહાય 3 હપ્તામાં સીધી જમા.',
    },
    department: {
      en: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture',
      hi: 'कृषि एवं किसान कल्याण विभाग, कृषि मंत्रालय',
    },
    officialPortal: {
      name: 'PM-KISAN Official Portal',
      url: 'https://pmkisan.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '155261',
        description: {
          en: 'PM-KISAN Farmer Helpline (IVRS Automated Status)',
          hi: 'पीएम-किसान किसान हेल्पलाइन (ऑटोमेटेड स्टेटस)',
        },
        tollFree: true,
      },
      {
        number: '1800-115-526',
        description: {
          en: 'Ministry of Agriculture Toll-Free Kisan Call Centre',
          hi: 'कृषि मंत्रालय किसान कॉल सेंटर',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Small and marginal landholder farmer families with cultivable land in their name',
        'Aadhaar seeded bank account with active NPCI DBT mapping',
        'Completed mandatory e-KYC and land seeding records',
        'Exclusions: Institutional landholders, government employees, income tax payers',
      ],
      hi: [
        'अपने नाम पर कृषि योग्य भूमि रखने वाले किसान परिवार',
        'आधार से जुड़ा और एनपीसीआई डीबीटी सक्षम बैंक खाता',
        'अनिवार्य ई-केवाईसी और भूमि सीडिंग (Land Seeding) पूरी होना आवश्यक',
        'आयकर दाता और सरकारी कर्मचारी इस योजना के लिए पात्र नहीं हैं',
      ],
    },
    fee: {
      en: 'Free of Cost for online registration at pmkisan.gov.in',
      hi: 'pmkisan.gov.in पर ऑनलाइन पंजीकरण पूरी तरह मुफ़्त (₹0)',
    },
    turnaroundTime: {
      en: 'Verification by State Nodal Officer within 30 to 45 days; benefits credited every 4 months',
      hi: 'राज्य नोडल अधिकारी द्वारा 30 से 45 दिनों में सत्यापन; हर 4 महीने में किस्त जारी',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Complete Mandatory e-KYC',
          hi: 'अनिवार्य e-KYC पूरा करें',
        },
        description: {
          en: 'Visit pmkisan.gov.in -> Farmers Corner -> "e-KYC", enter Aadhaar number and submit OTP received on mobile.',
          hi: 'pmkisan.gov.in पर जाएं -> Farmers Corner -> "e-KYC" पर क्लिक करें, आधार नंबर डालें और मोबाइल ओटीपी से सत्यापित करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'New Farmer Registration (If Not Enrolled)',
          hi: 'नया किसान पंजीकरण (यदि अभी तक नहीं जुड़े हैं)',
        },
        description: {
          en: 'Select Rural or Urban Farmer, enter State, District, Sub-district, Land survey/Khata/Khasra number and upload land ownership paper.',
          hi: 'ग्रामीण या शहरी किसान चुनें, राज्य, जिला, खतौनी/खसरा नंबर भरें और फर्द (भूमि दस्तावेज) अपलोड करें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Check NPCI Aadhaar Bank Seeding',
          hi: 'बैंक खाते में आधार और NPCI डीबीटी लिंक की जाँच',
        },
        description: {
          en: 'Ensure your savings bank account is mapped to NPCI for Direct Benefit Transfer (DBT). Contact your bank branch if pending.',
          hi: 'सुनिश्चित करें कि आपका बैंक खाता DBT सक्षम है। यदि नहीं है तो अपनी बैंक शाखा जाकर डीबीटी फॉर्म भरें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Track Installment Status',
          hi: 'किस्त और आवेदन का स्टेटस देखें',
        },
        description: {
          en: 'Go to "Know Your Status" on pmkisan.gov.in, enter Registration Number or Mobile to verify land seeding, e-KYC, and payment release.',
          hi: 'pmkisan.gov.in पर "Know Your Status" पर जाएं, रजिस्ट्रेशन नंबर डालकर जांचें कि ई-केवाईसी और लैंड सीडिंग में हरा टिक लगा है या नहीं।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_land_khatauni',
        name: {
          en: 'Land Ownership Document (Khatauni / Patta / 7/12 extract in farmer name)',
          hi: 'जमीन की फर्द / खतौनी / 7-12 का पर्चा (किसान के नाम पर)',
        },
        mandatory: true,
      },
      {
        id: 'doc_kisan_aadhaar',
        name: {
          en: 'Aadhaar Card linked with active mobile number',
          hi: 'सक्रिय मोबाइल नंबर से जुड़ा आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_bank_passbook',
        name: {
          en: 'Bank Passbook showing IFSC and Account Number (DBT enabled)',
          hi: 'बैंक पासबुक (IFSC और खाता संख्या स्पष्ट, DBT सक्षम)',
        },
        mandatory: true,
      },
    ],
    tags: ['farmer', 'kisan', 'agriculture', 'dbt', 'pmkisan', 'installment', 'ekyc', 'खेती', 'किसान', 'सम्मान निधि'],
    spokenSummary: {
      en: 'Under PM-KISAN, farmers receive ₹6,000 every year in three installments of ₹2,000. To receive your installments without disruption, complete your e-KYC at pmkisan.gov.in and verify that land seeding and NPCI DBT are linked to your bank account.',
      hi: 'पीएम-किसान योजना के तहत किसानों को हर साल ₹2,000 की तीन किस्तों में ₹6,000 मिलते हैं। किस्तें बिना रुकावट पाने के लिए pmkisan.gov.in पर ई-केवाईसी करें और सुनिश्चित करें कि बैंक खाते में डीबीटी और लैंड सीडिंग चालू है।',
    },
    suggestedQuestions: {
      en: [
        'Why did my PM-KISAN installment stop coming?',
        'How to link Aadhaar with bank account for NPCI DBT?',
        'How to find PM-KISAN Registration Number using mobile number?',
      ],
      hi: [
        'मेरी पीएम-किसान की किस्त क्यों रुक गई है?',
        'बैंक खाते में एनपीसीआई डीबीटी कैसे चालू करवाएं?',
        'मोबाइल नंबर से पीएम-किसान रजिस्ट्रेशन नंबर कैसे खोजें?',
      ],
    },
  },
  {
    id: 'ration-card',
    category: 'food_civil_supplies',
    title: {
      en: 'Ration Card & One Nation One Ration Card (ONORC)',
      hi: 'राशन कार्ड और एक राष्ट्र एक राशन कार्ड (ONORC)',
      ta: 'ரேஷன் அட்டை & ஒரே நாடு ஒரே ரேஷன் அட்டை',
      te: 'రేషన్ కార్డు & వన్ నేషన్ వన్ రేషన్ కార్డు',
      bn: 'রেশন কার্ড এবং এক দেশ এক রেশন কার্ড',
      mr: 'रेशन कार्ड आणि एक राष्ट्र एक रेशन कार्ड',
      kn: 'ರೇಷನ್ ಕಾರ್ಡ್ ಮತ್ತು ಒಂದು ದೇಶ ಒಂದು ರೇಷನ್ ಕಾರ್ಡ್',
      gu: 'રેશન કાર્ડ અને વન નેશન વન રેશન કાર્ડ',
    },
    shortDescription: {
      en: 'Apply for a new subsidized food grain ration card, add family members, or collect ration anywhere in India under ONORC.',
      hi: 'नए सब्सिडीयुक्त राशन कार्ड के लिए आवेदन करें, सदस्यों के नाम जोड़ें, या ONORC के तहत भारत में कहीं भी राशन प्राप्त करें।',
      ta: 'புதிய ரேஷன் அட்டை விண்ணப்பம் அல்லது குடும்ப உறுப்பினர்களைச் சேர்த்தல்.',
      te: 'కొత్త రేషన్ కార్డు దరఖాస్తు లేదా కుటుంబ సభ్యుల పేర్ల చేరిక.',
      bn: 'নতুন রেশন কার্ডের আবেদন, সদস্যদের নাম অন্তর্ভুক্ত এবং সারা দেশে খাদ্যশস্য সংগ্রহ।',
      mr: 'नवीन रेशन कार्डसाठी अर्ज करा किंवा देशभरात कोठेही धान्य मिळवा.',
      kn: 'ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್ ಅರ್ಜಿ ಅಥವಾ ಕುಟುಂಬದ ಸದಸ್ಯರನ್ನು ಸೇರಿಸುವುದು.',
      gu: 'નવા રેશન કાર્ડ માટે અરજી કરો અથવા દેશમાં ગમે ત્યાં અનાજ મેળવો.',
    },
    department: {
      en: 'Department of Food and Public Distribution, Ministry of Consumer Affairs',
      hi: 'खाद्य एवं सार्वजनिक वितरण विभाग, उपभोक्ता मामले मंत्रालय',
    },
    officialPortal: {
      name: 'National Food Security Portal (NFSA)',
      url: 'https://nfsa.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '1967',
        description: {
          en: 'National Consumer Food & PDS Toll-Free Helpline',
          hi: 'राष्ट्रीय खाद्य एवं पीडीएस टोल-फ्री हेल्पलाइन',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Priority Household (PHH) or Antyodaya Anna Yojana (AAY) based on state income thresholds',
        'No family member should possess another active ration card anywhere in India',
        'Resident of the respective state / union territory (or migrant worker eligible under ONORC)',
      ],
      hi: [
        'राज्य की आय सीमा के अनुसार प्राथमिकता परिवार (PHH) या अंत्योदय अन्न योजना (AAY)',
        'परिवार के किसी भी सदस्य के पास भारत में कोई दूसरा सक्रिय राशन कार्ड नहीं होना चाहिए',
        'प्रवासी मजदूर ONORC के तहत किसी भी उचित मूल्य दुकान (FPS) से अपना कोटा ले सकते हैं',
      ],
    },
    fee: {
      en: 'Nominal application fee ₹10 - ₹45 depending on the State Government',
      hi: 'राज्य सरकार के नियमों के अनुसार मात्र ₹10 से ₹45 का आवेदन शुल्क',
    },
    turnaroundTime: {
      en: '20 to 30 days following physical or digital verification by Food Supply Inspector',
      hi: 'खाद्य आपूर्ति निरीक्षक के सत्यापन के बाद 20 से 30 कार्य दिवस',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Locate Your State Food Portal',
          hi: 'अपने राज्य के खाद्य पोर्टल पर जाएं',
        },
        description: {
          en: 'Go to nfsa.gov.in -> "Ration Cards" menu -> "Ration Card Details on State Portals" and choose your state.',
          hi: 'nfsa.gov.in पर जाएं -> "Ration Cards" मेनू -> अपने राज्य का खाद्य पोर्टल चुनें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Fill Family Head & Member Details',
          hi: 'परिवार के मुखिया और सभी सदस्यों का विवरण भरें',
        },
        description: {
          en: 'Enter female head of family details, along with Aadhaar numbers and relationship of all residing members.',
          hi: 'परिवार की महिला मुखिया और सभी सदस्यों के आधार नंबर, जन्मतिथि और संबंध दर्ज करें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Upload Income & Residence Certificates',
          hi: 'आय और निवास प्रमाण पत्र अपलोड करें',
        },
        description: {
          en: 'Attach Tehsildar income certificate, current electricity bill/rent agreement, and bank passbook first page.',
          hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र, निवास प्रमाण और बैंक पासबुक की कॉपी अपलोड करें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Biometric Ration Collection under ONORC',
          hi: 'ONORC के तहत बायोमेट्रिक से राशन प्राप्त करें',
        },
        description: {
          en: 'Once card is generated, any family member can give biometric thumbprint at any Fair Price Shop (FPS) nationwide to receive grains.',
          hi: 'कार्ड बनने के बाद देश के किसी भी सरकारी राशन कोटे पर जाकर अंगूठा लगाकर अपना खाद्यान्न प्राप्त करें।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_aadhaar_members',
        name: {
          en: 'Aadhaar copies of all family members',
          hi: 'परिवार के सभी सदस्यों के आधार कार्ड की प्रतियां',
        },
        mandatory: true,
      },
      {
        id: 'doc_income_cert',
        name: {
          en: 'Income Certificate issued by Revenue Authority (Tehsildar)',
          hi: 'राजस्व अधिकारी/तहसीलदार द्वारा जारी आय प्रमाण पत्र',
        },
        mandatory: true,
      },
      {
        id: 'doc_gas_connection',
        name: {
          en: 'LPG Gas connection consumer number (if any)',
          hi: 'एलपीजी गैस कनेक्शन उपभोक्ता संख्या (यदि है तो)',
        },
        mandatory: false,
      },
      {
        id: 'doc_photo_family',
        name: {
          en: 'Joint passport-size photograph of the family head',
          hi: 'परिवार के मुखिया का पासपोर्ट साइज फोटो',
        },
        mandatory: true,
      },
    ],
    tags: ['ration', 'nfsa', 'onorc', 'food', 'grain', 'pds', 'aay', 'phh', 'राशन', 'खाद्य', 'अनाज'],
    spokenSummary: {
      en: 'To apply for a new Ration Card or add family members, visit your state food portal through nfsa.gov.in with family Aadhaar cards and an income certificate. Under One Nation One Ration Card, you can collect food grains from any ration shop in India.',
      hi: 'नया राशन कार्ड बनवाने या सदस्य जोड़ने के लिए nfsa.gov.in के माध्यम से अपने राज्य के पोर्टल पर परिवार के आधार कार्ड और आय प्रमाण पत्र के साथ आवेदन करें। एक राष्ट्र एक राशन कार्ड योजना से आप देश की किसी भी राशन दुकान से अनाज ले सकते हैं।',
    },
    suggestedQuestions: {
      en: [
        'How to add a newborn baby to an existing ration card?',
        'How does a migrant worker collect ration under ONORC in another state?',
        'What is the difference between BPL, APL, and Antyodaya ration cards?',
      ],
      hi: [
        'राशन कार्ड में नवजात शिशु का नाम कैसे जोड़ें?',
        'प्रवासी मजदूर दूसरे राज्य में राशन कैसे प्राप्त कर सकते हैं?',
        'बीपीएल, एपीएल और अंत्योदय राशन कार्ड में क्या अंतर है?',
      ],
    },
  },
  {
    id: 'digilocker',
    category: 'documents',
    title: {
      en: 'DigiLocker - Official Digital Documents Wallet',
      hi: 'डिजिलॉकर - आधिकारिक डिजिटल दस्तावेज़ वॉलेट',
      ta: 'டிஜிலாக்கர் - அதிகாரப்பூர்வ ஆவணங்கள் பணப்பை',
      te: 'డిజిలాకర్ - అధికారిక డిజిటల్ పత్రాల వాలెట్',
      bn: 'ডিজিটাল লকার - সরকারি ডিজিটাল নথিপত্র',
      mr: 'डिजीलॉकर - अधिकृत डिजिटल दस्तऐवज',
      kn: 'ಡಿಜಿಲಾಕರ್ - ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳ ವಾಲೆಟ್',
      gu: 'ડીજીલોકર - સત્તાવાર ડિજિટલ દસ્તાવેજ વૉલેટ',
    },
    shortDescription: {
      en: 'Legally valid digital wallet to store and fetch Driving License, Vehicle RC, 10th/12th marksheets, and PAN card directly from government issuers.',
      hi: 'ड्राइविंग लाइसेंस, गाड़ी की आरसी, मार्कशीट और पैन कार्ड सीधे सरकारी विभागों से प्राप्त करने और रखने का कानूनी डिजिटल वॉलेट।',
      ta: 'ஓட்டுநர் உரிமம், வாகன ஆர்சி மற்றும் கல்விச் சான்றிதழ்களை டிஜிட்டல் முறையில் பெறலாம்.',
      te: 'డ్రైవింగ్ లైసెన్స్, వాహన ఆర్సీ మరియు మార్క్ షీట్లను సురక్షితంగా నిల్వ చేసుకోండి.',
      bn: 'ড্রাইভিং লাইসেন্স, গাড়ির আরসি এবং প্যান কার্ড বৈধভাবে সংরক্ষণ করার প্ল্যাটফর্ম।',
      mr: 'ड्रायव्हिंग लायसन्स, वाहन आरसी आणि पॅन कार्ड कायदेशीररित्या डिजिटल स्वरूपात मिळवा.',
      kn: 'ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್, ವಾಹನ ಆರ್ಸಿ ಮತ್ತು ಅಂಕಪಟ್ಟಿಗಳನ್ನು ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲಿ ಪಡೆಯಿರಿ.',
      gu: 'ડ્રાઇવિંગ લાયસન્સ, વાહન આરસી અને પાન કાર્ડ કાયદેસર રીતે ડિજિટલ સ્વરૂપે મેળવો.',
    },
    department: {
      en: 'Digital India Corporation, Ministry of Electronics and IT (MeitY)',
      hi: 'डिजिटल इंडिया कॉर्पोरेशन, इलेक्ट्रॉनिक्स और आईटी मंत्रालय',
    },
    officialPortal: {
      name: 'DigiLocker Web Portal',
      url: 'https://www.digilocker.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '011-24301851',
        description: {
          en: 'DigiLocker National Technical Support Desk',
          hi: 'डिजिलॉकर राष्ट्रीय तकनीकी सहायता',
        },
        tollFree: false,
      },
    ],
    eligibility: {
      en: [
        'Any Indian citizen holding an Aadhaar number',
        'Mobile number must be registered with Aadhaar for account creation',
        'Documents issued in DigiLocker are legally equivalent to original physical documents under Rule 9A of IT Rules 2016',
      ],
      hi: [
        'आधार नंबर रखने वाला कोई भी भारतीय नागरिक',
        'खाता बनाने के लिए मोबाइल नंबर आधार से लिंक होना चाहिए',
        'आईटी नियम 2016 के नियम 9ए के तहत डिजिलॉकर के दस्तावेज मूल दस्तावेजों के समान कानूनी रूप से मान्य हैं',
      ],
    },
    fee: {
      en: '100% Free of Cost with 1GB secure cloud storage provided by Government of India',
      hi: 'भारत सरकार द्वारा 1GB सुरक्षित क्लाउड स्टोरेज के साथ 100% मुफ़्त',
    },
    turnaroundTime: {
      en: 'Instant (Real-time API fetch from Ministry of Road Transport, CBSE, Income Tax, etc.)',
      hi: 'तत्काल (परिवहन विभाग, सीबीएसई, आयकर विभाग से सीधे रियल-टाइम डाउनलोड)',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Sign Up with Aadhaar & Mobile',
          hi: 'आधार और मोबाइल से साइन अप करें',
        },
        description: {
          en: 'Open digilocker.gov.in or DigiLocker App, click Sign Up, enter Full Name, Date of Birth, Gender, Mobile, 6-digit security PIN and Aadhaar number.',
          hi: 'digilocker.gov.in पर जाएं, नाम, जन्मतिथि, मोबाइल नंबर और 6 अंकों का सुरक्षा पिन डालकर आधार से अकाउंट बनाएं।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Search for Issuing Authority',
          hi: 'दस्तावेज़ जारी करने वाले विभाग को खोजें',
        },
        description: {
          en: 'Click "Search Documents", type Ministry of Road Transport (for DL/RC), Income Tax Department (for PAN), or CBSE (for Marksheets).',
          hi: '"Search Documents" में जाएं, जैसे ड्राइविंग लाइसेंस के लिए परिवहन विभाग या पैन के लिए आयकर विभाग चुनें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Enter Document Reference Number',
          hi: 'दस्तावेज़ का नंबर दर्ज करें',
        },
        description: {
          en: 'Input your DL Number or Vehicle Registration number or PAN number and click "Get Document".',
          hi: 'अपना डीएल नंबर या वाहन नंबर या पैन नंबर डालें और "Get Document" पर क्लिक करें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Access Under "Issued Documents"',
          hi: '"Issued Documents" में डिजिटल कॉपी देखें',
        },
        description: {
          en: 'Your verified digital certificate is now saved. Traffic police and airports are mandated by law to accept this.',
          hi: 'आपका डिजिटल प्रमाणपत्र सेव हो गया है। ट्रैफिक पुलिस और हवाई अड्डों पर इसे दिखाना कानूनी रूप से मान्य है।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_aadhaar_digi',
        name: {
          en: '12-digit Aadhaar Number with OTP access',
          hi: 'ओटीपी सुविधा युक्त 12 अंकों का आधार नंबर',
        },
        mandatory: true,
      },
      {
        id: 'doc_dl_or_pan_no',
        name: {
          en: 'Target Document Identification Number (e.g., DL Number, Roll Number, PAN)',
          hi: 'दस्तावेज़ का नंबर (जैसे डीएल नंबर, रोल नंबर या पैन नंबर)',
        },
        mandatory: true,
      },
    ],
    tags: ['digilocker', 'driving license', 'rc', 'pan', 'marksheets', 'cbse', 'digital india', 'डिजिलॉकर', 'दस्तावेज', 'लाइसेंस'],
    spokenSummary: {
      en: 'DigiLocker is an official government app where you can download your Driving License, Vehicle RC, PAN card, and marksheet directly. Under Indian IT Law, digital documents in DigiLocker are 100% legally valid anywhere, including with Traffic Police.',
      hi: 'डिजिलॉकर एक आधिकारिक सरकारी ऐप है जहाँ आप अपना ड्राइविंग लाइसेंस, गाड़ी की आरसी, पैन कार्ड और मार्कशीट सीधे डाउनलोड कर सकते हैं। भारतीय आईटी कानून के तहत ट्रैफिक पुलिस और सभी जगहों पर यह मूल दस्तावेज की तरह मान्य है।',
    },
    suggestedQuestions: {
      en: [
        'Is DigiLocker Driving License valid during traffic police checking?',
        'How to download class 10th and 12th marksheet on DigiLocker?',
        'How to link e-PAN card with DigiLocker account?',
      ],
      hi: [
        'क्या ट्रैफिक पुलिस चेकिंग के दौरान डिजिलॉकर का डीएल मान्य होता है?',
        'डिजिलॉकर पर 10वीं और 12वीं की मार्कशीट कैसे डाउनलोड करें?',
        'डिजिलॉकर में पैन कार्ड कैसे जोड़ें?',
      ],
    },
  },
  {
    id: 'passport-seva',
    category: 'travel',
    title: {
      en: 'Passport Seva Kendra - Fresh Application & Renewal',
      hi: 'पासपोर्ट सेवा केंद्र - नया पासपोर्ट आवेदन और नवीनीकरण',
      ta: 'பாஸ்போர்ட் சேவா - புதிய பாஸ்போர்ட் விண்ணப்பம்',
      te: 'పాస్‌పోర్ట్ సేవా - కొత్త పాస్‌పోర్ట్ దరఖాస్తు',
      bn: 'পাসপোর্ট সেবা - নতুন পাসপোর্ট আবেদন এবং পুনর্নবীকরণ',
      mr: 'पासपोर्ट सेवा - नवीन पासपोर्ट अर्ज आणि नूतनीकरण',
      kn: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ - ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್ ಅರ್ಜಿ',
      gu: 'પાસપોર્ટ સેવા - નવી પાસપોર્ટ અરજી અને નવીનીકરણ',
    },
    shortDescription: {
      en: 'Apply for ordinary Indian passport (Normal or Tatkaal), schedule an appointment at your nearest PSK/POPSK, and track police verification.',
      hi: 'सामान्य या तत्काल भारतीय पासपोर्ट के लिए आवेदन करें, नजदीकी पीएसके में अप्वाइंटमेंट बुक करें और पुलिस वेरिफिकेशन ट्रैक करें।',
      ta: 'புதிய இந்திய பாஸ்போர்ட்டிற்கு விண்ணப்பித்து நேர்காணல் முன்பதிவு செய்யவும்.',
      te: 'కొత్త భారతీయ పాస్‌పోర్ట్ కోసం దరఖాస్తు చేసుకోండి మరియు అపాయింట్‌మెంట్ బుక్ చేయండి.',
      bn: 'সাধারণ বা তৎকাল ভারতীয় পাসপোর্টের জন্য আবেদন এবং সাক্ষাৎকার বুকিং।',
      mr: 'नवीन पासपोर्ट किंवा तत्काळ पासपोर्टसाठी ऑनलाईन अर्ज करा आणि वेळ निश्चित करा.',
      kn: 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಾಗಿ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ.',
      gu: 'નવા પાસપોર્ટ માટે ઓનલાઇન અરજી કરો અને નજીકના કેન્દ્રમાં એપોઇન્ટમેન્ટ બુક કરો.',
    },
    department: {
      en: 'Consular, Passport & Visa Division, Ministry of External Affairs (MEA)',
      hi: 'कांसुलर, पासपोर्ट और वीजा प्रभाग, विदेश मंत्रालय (MEA)',
    },
    officialPortal: {
      name: 'Passport Seva Official Portal',
      url: 'https://www.passportindia.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '1800-258-1800',
        description: {
          en: 'National Passport Call Centre (Toll-Free, 8 AM - 10 PM)',
          hi: 'राष्ट्रीय पासपोर्ट कॉल सेंटर (टोल-फ्री, सुबह 8 से रात 10 बजे)',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Indian citizen by birth, descent, registration, or naturalization',
        'Valid proof of Date of Birth, Address, and Non-ECR documentary proof',
        'No active criminal proceedings or impounding orders under the Passports Act 1967',
      ],
      hi: [
        'जन्म, वंश या पंजीकरण द्वारा भारतीय नागरिक',
        'जन्मतिथि, आवासीय पता और नॉन-ईसीआर (शैक्षणिक) प्रमाण पत्र',
        'पासपोर्ट अधिनियम 1967 के तहत कोई आपराधिक मामला लंबित न हो',
      ],
    },
    fee: {
      en: 'Normal 36-page booklet: ₹1,500; Tatkaal scheme: ₹3,500 (₹1,500 online + ₹2,000 at PSK)',
      hi: 'सामान्य 36 पेज का पासपोर्ट: ₹1,500; तत्काल योजना: ₹3,500',
    },
    turnaroundTime: {
      en: 'Tatkaal: 1 to 3 days (pre-police verification); Normal: 10 to 20 days post police verification',
      hi: 'तत्काल: 1 से 3 दिन; सामान्य: पुलिस वेरिफिकेशन के बाद 10 से 20 दिन',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Register on Official Passport Portal',
          hi: 'आधिकारिक पासपोर्ट पोर्टल पर रजिस्टर करें',
        },
        description: {
          en: 'Visit passportindia.gov.in, register user account, select your nearest Passport Office and log in.',
          hi: 'passportindia.gov.in पर जाएं, नया यूजर खाता बनाएं, पासपोर्ट कार्यालय चुनें और लॉग इन करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Fill Application for Fresh/Reissue',
          hi: 'नया पासपोर्ट या नवीनीकरण फॉर्म भरें',
        },
        description: {
          en: 'Select "Apply for Fresh Passport / Re-issue", choose Normal or Tatkaal, 36 or 60 pages, and enter personal & family details.',
          hi: '"Apply for Fresh Passport" चुनें, नॉर्मल या तत्काल चुनें और व्यक्तिगत व पारिवारिक जानकारी ध्यानपूर्वक भरें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Pay Online and Schedule Appointment',
          hi: 'ऑनलाइन फीस भरें और अप्वाइंटमेंट बुक करें',
        },
        description: {
          en: 'Pay ₹1,500 fee using SBI e-Pay/UPI, pick your preferred Passport Seva Kendra (PSK) or Post Office PSK (POPSK) and book slot.',
          hi: 'ऑनलाइन ₹1,500 फीस जमा करें और अपनी सुविधा अनुसार नजदीकी पीएसके या पोस्ट ऑफिस पीएसके में तारीख और समय बुक करें।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Visit PSK with Original Documents',
          hi: 'मूल दस्तावेजों के साथ पीएसके जाएं',
        },
        description: {
          en: 'Reach PSK 15 minutes before slot with original Aadhaar, 10th marksheet, bank passbook. Photographs are taken digitally inside PSK.',
          hi: 'अप्वाइंटमेंट के समय मूल आधार, 10वीं की मार्कशीट और पासबुक लेकर जाएं। फोटो पीएसके के अंदर ही डिजिटल खींची जाती है।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_dob_proof',
        name: {
          en: 'Proof of Date of Birth (Aadhaar Card, Birth Certificate, or 10th School Passing Certificate)',
          hi: 'जन्मतिथि प्रमाण (आधार कार्ड, जन्म प्रमाण पत्र या 10वीं की अंकतालिका)',
        },
        mandatory: true,
      },
      {
        id: 'doc_passport_poa',
        name: {
          en: 'Proof of Present Address (Aadhaar, Voter ID, Electricity Bill, or Scheduled Bank Passbook)',
          hi: 'वर्तमान पते का प्रमाण (आधार कार्ड, वोटर आईडी, बिजली बिल या बैंक पासबुक)',
        },
        mandatory: true,
      },
      {
        id: 'doc_non_ecr',
        name: {
          en: 'Non-ECR Eligible Document (10th Standard or Higher Educational Marksheet)',
          hi: 'नॉन-ईसीआर प्रमाण (10वीं कक्षा या उससे अधिक की शैक्षणिक मार्कशीट)',
        },
        mandatory: false,
        tip: {
          en: 'Without 10th marksheet, passport is issued with Emigration Check Required (ECR) stamp',
          hi: '10वीं की मार्कशीट न होने पर ईसीआर (ECR) पासपोर्ट जारी किया जाता है',
        },
      },
    ],
    tags: ['passport', 'travel', 'mea', 'psk', 'tatkaal', 'police verification', 'विदेश यात्रा', 'पासपोर्ट'],
    spokenSummary: {
      en: 'To apply for an Indian passport, register at passportindia.gov.in, fill the application, pay ₹1,500 online and schedule an appointment at your nearest Passport Seva Kendra. Bring original Aadhaar, address proof, and your 10th marksheet for Non-ECR status.',
      hi: 'पासपोर्ट बनवाने के लिए passportindia.gov.in पर फॉर्म भरें, ₹1,500 ऑनलाइन फीस जमा करके नजदीकी पासपोर्ट सेवा केंद्र में अप्वाइंटमेंट लें। अपने साथ मूल आधार कार्ड, पते का प्रमाण और 10वीं की मार्कशीट अवश्य लेकर जाएं।',
    },
    suggestedQuestions: {
      en: [
        'What is the difference between Normal and Tatkaal passport processing?',
        'What documents are needed for a child or minor passport?',
        'How does police verification work for passport issuance?',
      ],
      hi: [
        'नॉर्मल और तत्काल पासपोर्ट में क्या अंतर होता है?',
        'नाबालिग बच्चों का पासपोर्ट बनवाने के लिए क्या दस्तावेज चाहिए?',
        'पासपोर्ट के लिए पुलिस वेरिफिकेशन की प्रक्रिया क्या होती है?',
      ],
    },
  },
  {
    id: 'voter-id',
    category: 'elections',
    title: {
      en: 'Voter ID Card & National Voters’ Service (EPIC)',
      hi: 'वोटर आईडी कार्ड और राष्ट्रीय मतदाता सेवा (EPIC)',
      ta: 'வாக்காளர் அடையாள அட்டை & தேசிய வாக்காளர் சேவை',
      te: 'ఓటరు గుర్తింపు కార్డు & జాతీయ ఓటర్ల సేవ',
      bn: 'ভোটার আইডি কার্ড এবং জাতীয় ভোটার সেবা',
      mr: 'मतदार ओळखपत्र आणि राष्ट्रीय मतदार सेवा (EPIC)',
      kn: 'ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಮತದಾರರ ಸೇವೆ',
      gu: 'મતદાર ઓળખકાર્ડ અને રાષ્ટ્રીય મતદાતા સેવા (EPIC)',
    },
    shortDescription: {
      en: 'Register as a new voter (Form 6), correct details (Form 8), or download digital e-EPIC from Election Commission of India.',
      hi: 'नए मतदाता के रूप में पंजीकरण (फॉर्म 6), विवरण में सुधार (फॉर्म 8), या डिजिटल ई-एपिक डाउनलोड करें।',
      ta: 'புதிய வாக்காளர் பதிவு அல்லது டிஜிட்டல் வாக்காளர் அடையாள அட்டை பதிவிறக்கம்.',
      te: 'కొత్త ఓటరు నమోదు లేదా డిజిటల్ ఓటరు కార్డు డౌన్‌లోడ్ చేసుకోండి.',
      bn: 'নতুন ভোটার নিবন্ধন বা ডিজিটাল ভোটার কার্ড ডাউনলোড করুন।',
      mr: 'नवीन मतदार नोंदणी करा किंवा डिजिटल मतदार कार्ड डाऊनलोड करा.',
      kn: 'ಹೊಸ ಮತದಾರರ ನೋಂದಣಿ ಅಥವಾ ಡಿಜಿಟಲ್ ವೋಟರ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
      gu: 'નવા મતદાતા તરીકે નોંધણી કરો અથવા ડિજિટલ મતદાર કાર્ડ ડાઉનલોડ કરો.',
    },
    department: {
      en: 'Election Commission of India (ECI)',
      hi: 'भारत निर्वाचन आयोग (ECI)',
    },
    officialPortal: {
      name: 'ECI Voters’ Service Portal',
      url: 'https://voters.eci.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '1950',
        description: {
          en: 'Election Commission of India Toll-Free Voter Helpline',
          hi: 'भारत निर्वाचन आयोग टोल-फ्री वोटर हेल्पलाइन',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Indian citizen who has attained 18 years of age on qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1)',
        'Ordinary resident of the constituency applied for',
        'Not disqualified under any law due to corrupt practices or criminal conviction',
      ],
      hi: [
        '18 वर्ष की आयु पूरी कर चुका भारतीय नागरिक',
        'उस विधानसभा क्षेत्र का सामान्य निवासी जहाँ आवेदन कर रहे हैं',
      ],
    },
    fee: {
      en: '100% Free of Cost (ECI delivers physical color plastic EPIC card to home via speed post for ₹0)',
      hi: 'पूरी तरह मुफ़्त (स्पीड पोस्ट से घर पर नया प्लास्टिक वोटर कार्ड मुफ़्त भेजा जाता है)',
    },
    turnaroundTime: {
      en: '15 to 30 days after verification by Booth Level Officer (BLO)',
      hi: 'बीएलओ (BLO) द्वारा घर आकर सत्यापन के बाद 15 से 30 दिन',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Register on ECI Voters Portal',
          hi: 'वोटर्स पोर्टल पर लॉगिन करें',
        },
        description: {
          en: 'Go to voters.eci.gov.in or download Voter Helpline App, sign up with mobile and OTP.',
          hi: 'voters.eci.gov.in पर जाएं या वोटर हेल्पलाइन ऐप डाउनलोड करके मोबाइल नंबर से साइन अप करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Fill Form 6 for New Voter Registration',
          hi: 'नए वोटर के लिए फॉर्म 6 भरें',
        },
        description: {
          en: 'Select Form 6, choose State, District, Assembly Constituency, enter personal details and relation.',
          hi: 'फॉर्म 6 पर क्लिक करें, अपना राज्य, जिला, विधानसभा क्षेत्र और व्यक्तिगत जानकारी भरें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Upload Photo & Age/Address Proof',
          hi: 'फोटो और उम्र/पते का प्रमाण अपलोड करें',
        },
        description: {
          en: 'Upload passport photo and Aadhaar card (serves as both age and address proof).',
          hi: 'अपना पासपोर्ट साइज फोटो और आधार कार्ड की प्रति अपलोड करें (यह उम्र और पता दोनों का काम करता है)।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Track Status & Download e-EPIC',
          hi: 'स्टेटस ट्रैक करें और ई-एपिक डाउनलोड करें',
        },
        description: {
          en: 'Use Reference Number to track BLO verification. Once accepted, download digital e-EPIC PDF instantly.',
          hi: 'आवेदन के बाद मिले रेफरेंस नंबर से स्टेटस ट्रैक करें और स्वीकार होने पर डिजिटल ई-एपिक तुरंत डाउनलोड करें।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_voter_photo',
        name: {
          en: 'Recent passport size color photograph (white background)',
          hi: 'हालिया पासपोर्ट साइज रंगीन फोटो (सफेद बैकग्राउंड)',
        },
        mandatory: true,
      },
      {
        id: 'doc_voter_aadhaar',
        name: {
          en: 'Aadhaar Card or 10th certificate for Date of Birth & Address',
          hi: 'उम्र और पते के प्रमाण के लिए आधार कार्ड या 10वीं का प्रमाण पत्र',
        },
        mandatory: true,
      },
    ],
    tags: ['voter', 'election', 'eci', 'epic', 'form 6', 'vote', 'मतदाता', 'वोटर कार्ड', 'चुनाव'],
    spokenSummary: {
      en: 'To make a new Voter ID card, visit voters.eci.gov.in and fill Form 6 with your photo and Aadhaar card. It is completely free, and the Election Commission sends the physical card to your home address via Speed Post.',
      hi: 'नया वोटर कार्ड बनवाने के लिए voters.eci.gov.in पर जाकर फॉर्म 6 भरें। इसके लिए केवल फोटो और आधार कार्ड चाहिए। यह पूरी तरह मुफ्त है और चुनाव आयोग स्पीड पोस्ट द्वारा नया कार्ड आपके पते पर भेजता है।',
    },
    suggestedQuestions: {
      en: [
        'How to shift Voter ID to a new address or constituency?',
        'How to download digital e-EPIC card on mobile?',
        'How to search your name in the electoral voter list?',
      ],
      hi: [
        'पते में बदलाव के बाद वोटर आईडी नई विधानसभा में कैसे ट्रांसफर करें?',
        'मोबाइल पर डिजिटल ई-एपिक वोटर कार्ड कैसे डाउनलोड करें?',
        'मतदाता सूची (वोटर लिस्ट) में अपना नाम कैसे चेक करें?',
      ],
    },
  },
  {
    id: 'pm-awas',
    category: 'housing',
    title: {
      en: 'Pradhan Mantri Awas Yojana (PMAY) - Housing for All',
      hi: 'प्रधानमंत्री आवास योजना (PMAY) - पक्का मकान योजना',
      ta: 'பிரதான் மந்திரி ஆவாஸ் யோஜனா (PMAY) - வீடு திட்டம்',
      te: 'ప్రధాన మంత్రి ఆవాస్ యోజన (PMAY) - పక్కా ఇల్లు పథకం',
      bn: 'প্রধানমন্ত্রী আবাস যোজনা (PMAY) - গৃহ প্রকল্প',
      mr: 'प्रधानमंत्री आवास योजना (PMAY) - पक्के घर योजना',
      kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ (PMAY) - ಪಕ್ಕಾ ಮನೆ ಯೋಜನೆ',
      gu: 'પ્રધાનમંત્રી આવાસ યોજના (PMAY) - પાકું મકાન સહાય',
    },
    shortDescription: {
      en: 'Financial assistance of ₹1.2 lakh to ₹2.67 lakh for construction or purchase of a pucca house for rural and urban low-income families.',
      hi: 'ग्रामीण और शहरी गरीब परिवारों के लिए पक्के मकान के निर्माण या खरीद हेतु ₹1.20 लाख से ₹2.67 लाख तक की सरकारी वित्तीय सहायता।',
      ta: 'கிராமப்புற மற்றும் நகர்ப்புற ஏழைக் குடும்பங்களுக்கு வீடு கட்ட நிதி உதவி.',
      te: 'గ్రామీణ మరియు పట్టణ పేద కుటుంబాలకు పక్కా ఇల్లు నిర్మించుకోవడానికి ఆర్థిక సహాయం.',
      bn: 'গ্রামীণ ও শহুরে পরিবারের জন্য পাকা বাড়ি তৈরির সরকারি আর্থিক অনুদান।',
      mr: 'ग्रामीण आणि शहरी कुटुंबांसाठी पक्के घर बांधण्यासाठी सरकारी अनुदान.',
      kn: 'ಗ್ರಾಮೀಣ ಮತ್ತು ನಗರ ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ಆರ್ಥಿಕ ಸಹಾಯ.',
      gu: 'ગરીબ પરિવારોને પાકું મકાન બનાવવા માટે સરકારી નાણાકીય સહાય.',
    },
    department: {
      en: 'Ministry of Housing and Urban Affairs & Ministry of Rural Development',
      hi: 'आवासन और शहरी कार्य मंत्रालय एवं ग्रामीण विकास मंत्रालय',
    },
    officialPortal: {
      name: 'PMAY Urban / Rural Portal',
      url: 'https://pmaymis.gov.in',
      badge: 'Official Portal (gov.in)',
      isOfficial: true,
    },
    helplines: [
      {
        number: '1800-11-6163',
        description: {
          en: 'PMAY Urban Citizen Toll-Free Helpline',
          hi: 'पीएम आवास शहरी टोल-फ्री हेल्पलाइन',
        },
        tollFree: true,
      },
      {
        number: '1800-11-6446',
        description: {
          en: 'PMAY Rural (Gramin) Toll-Free Support',
          hi: 'पीएम आवास ग्रामीण टोल-फ्री सहायता',
        },
        tollFree: true,
      },
    ],
    eligibility: {
      en: [
        'Family must not own a pucca house anywhere in India in the name of any member',
        'Economically Weaker Section (EWS) annual income up to ₹3 lakh; LIG up to ₹6 lakh',
        'Female ownership or co-ownership of the property is prioritized/mandatory',
      ],
      hi: [
        'परिवार के किसी भी सदस्य के नाम पर भारत में कहीं भी कोई पक्का मकान नहीं होना चाहिए',
        'आर्थिक रूप से कमजोर वर्ग (EWS) वार्षिक आय ₹3 लाख तक; LIG ₹6 लाख तक',
        'मकान के स्वामित्व में परिवार की महिला का नाम होना अनिवार्य या प्राथमिकता पर है',
      ],
    },
    fee: {
      en: 'Free of Cost for government subsidy application',
      hi: 'सरकारी सब्सिडी आवेदन के लिए कोई शुल्क नहीं (₹0)',
    },
    turnaroundTime: {
      en: 'Geotagging and municipal survey verification takes 2 to 3 months; subsidy disbursed in direct DBT construction stages',
      hi: 'जियोटैगिंग और नगर पालिका/पंचायत सर्वे में 2 से 3 महीने; किस्तों में सीधे बैंक खाते में भुगतान',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Check Beneficiary List on PMAY Portal',
          hi: 'PMAY पोर्टल पर लाभार्थी सूची देखें',
        },
        description: {
          en: 'Visit pmaymis.gov.in (for urban) or pmayg.nic.in (for rural) and check if your family is listed under the Awas+ survey.',
          hi: 'शहरी क्षेत्र के लिए pmaymis.gov.in या ग्रामीण के लिए pmayg.nic.in पर जाकर आवास+ सूची में नाम चेक करें।',
        },
      },
      {
        stepNumber: 2,
        title: {
          en: 'Submit Application with Land / Income Papers',
          hi: 'जमीन और आय प्रमाण के साथ आवेदन जमा करें',
        },
        description: {
          en: 'Apply through your local Nagar Palika / Gram Panchayat or Common Service Centre (CSC) with Aadhaar and bank details.',
          hi: 'अपनी स्थानीय नगर पालिका या ग्राम पंचायत सचिव के पास आधार और बैंक खाते के साथ फॉर्म भरें।',
        },
      },
      {
        stepNumber: 3,
        title: {
          en: 'Geo-Tagging Inspection',
          hi: 'मौके पर जियो-टैगिंग निरीक्षण',
        },
        description: {
          en: 'Government officers visit your location to take geotagged photographs of the unconstructed plot or kachha house.',
          hi: 'अधिकारी आपके मौजूदा कच्चे घर या खाली प्लॉट की तस्वीर मोबाइल ऐप से जियो-टैग करके अपलोड करते हैं।',
        },
      },
      {
        stepNumber: 4,
        title: {
          en: 'Direct DBT Installment Transfers',
          hi: 'निर्माण के चरणों में डीबीटी द्वारा किस्त',
        },
        description: {
          en: 'Subsidy funds are credited directly to your bank account in 3 stages: Foundation, Lintel, and Completion.',
          hi: 'नींव भरने, छत डालने और मकान पूरा होने पर 3 किस्तों में सीधे आपके बैंक खाते में पैसा ट्रांसफर होता है।',
        },
      },
    ],
    checklist: [
      {
        id: 'doc_awas_aadhaar',
        name: {
          en: 'Aadhaar Card of all family members',
          hi: 'परिवार के सभी सदस्यों का आधार कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_awas_land',
        name: {
          en: 'Proof of land/plot ownership where house is to be built',
          hi: 'प्लॉट या जमीन के मालिकाना हक का प्रमाण/पट्टा',
        },
        mandatory: true,
      },
      {
        id: 'doc_awas_income',
        name: {
          en: 'Income certificate or BPL card',
          hi: 'आय प्रमाण पत्र या बीपीएल राशन कार्ड',
        },
        mandatory: true,
      },
      {
        id: 'doc_awas_bank',
        name: {
          en: 'DBT enabled Bank Passbook copy',
          hi: 'डीबीटी सक्षम बैंक पासबुक की प्रति',
        },
        mandatory: true,
      },
    ],
    tags: ['housing', 'awas', 'pmay', 'home', 'subsidy', 'gramin', 'मकान', 'आवास योजना', 'घर'],
    spokenSummary: {
      en: 'Under Pradhan Mantri Awas Yojana, low-income families get financial assistance between ₹1.2 lakh and ₹2.67 lakh to build a pucca house. Applications are routed through your local Gram Panchayat or Nagar Palika with land documents and income proof.',
      hi: 'प्रधानमंत्री आवास योजना के तहत पक्का मकान बनाने के लिए ₹1.20 लाख से ₹2.67 लाख तक की सरकारी सहायता मिलती है। इसके लिए अपनी ग्राम पंचायत या नगर पालिका में आधार, जमीन के कागज और आय प्रमाण पत्र के साथ आवेदन किया जाता है।',
    },
    suggestedQuestions: {
      en: [
        'How to check if my name is in the PMAY Gramin beneficiary list?',
        'What is the Credit Linked Subsidy Scheme (CLSS) for home loans?',
        'How many installments are paid during house construction?',
      ],
      hi: [
        'पीएम आवास ग्रामीण की नई लिस्ट में अपना नाम कैसे चेक करें?',
        'होम लोन पर ब्याज सब्सिडी (CLSS) कैसे मिलती है?',
        'मकान निर्माण के दौरान किस्तें कितने चरणों में मिलती हैं?',
      ],
    },
  },
];
