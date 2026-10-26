export interface KnowledgeChunk {
  id: string;
  serviceId: string;
  category: string;
  title: string;
  questionKeywords: string[];
  content: string;
  actionableSteps: string[];
  requiredDocuments: { name: string; mandatory: boolean; tip?: string }[];
  officialFee: string;
  processingTime: string;
  eligibility: string[];
  officialUrl: string;
  officialPortalName: string;
  helplines: { number: string; description: string; tollFree: boolean }[];
  relatedQuestions: string[];
}

export const VERIFIED_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // AADHAAR ADDRESS UPDATE
  {
    id: 'aadhaar-address-update-online',
    serviceId: 'aadhaar-update',
    category: 'identity',
    title: 'Aadhaar Card Online Address Update',
    questionKeywords: [
      'aadhaar', 'aadhar', 'adhar', 'address', 'pata', 'myaadhaar', 'uidai', 
      'address proof', 'electricity bill', 'rent agreement', 'आधार', 'पता', 'एड्रेस'
    ],
    content: 
      'Aadhaar residential address can be updated online through the official UIDAI myAadhaar portal (myaadhaar.uidai.gov.in). ' +
      'A mobile number linked with Aadhaar is mandatory to receive the one-time password (OTP). ' +
      'A clear scan of a valid Proof of Address (such as an electricity bill less than 3 months old, bank passbook, rent agreement, or voter ID) must be uploaded. ' +
      'The official UIDAI demographic update fee is ₹50 payable online via UPI or card. ' +
      'Processing takes 5 to 15 working days. A 14-digit Update Request Number (URN) is issued to track application status. ' +
      'Once updated, the e-Aadhaar can be downloaded immediately free of cost.',
    actionableSteps: [
      'Visit the official myAadhaar portal at https://myaadhaar.uidai.gov.in and click "Login".',
      'Enter your 12-digit Aadhaar number, captcha, and verify with the OTP sent to your linked mobile.',
      'Select "Address Update" -> "Update Address in Aadhaar Online".',
      'Enter your new residential address details (Pin code, Village/Town, District, House/Street).',
      'Upload a valid Proof of Address document (PDF or JPEG, max 2MB).',
      'Pay the non-refundable official fee of ₹50 via UPI, debit card, or net banking.',
      'Save the acknowledgment slip and 14-digit URN to track verification status.'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Number & Registered Mobile Phone (for OTP)', mandatory: true, tip: 'Mobile must be active to receive OTP' },
      { name: 'Valid Proof of Address (Electricity bill, Bank passbook, or Rent agreement)', mandatory: true, tip: 'Utility bills must be less than 3 months old' }
    ],
    officialFee: '₹50 (Standard UIDAI online demographic update fee)',
    processingTime: '5 to 15 working days',
    eligibility: [
      'Must possess an existing 12-digit Aadhaar number',
      'Mobile number must be pre-linked to receive verification OTP',
      'Address proof must match the name of the applicant'
    ],
    officialUrl: 'https://myaadhaar.uidai.gov.in',
    officialPortalName: 'UIDAI myAadhaar Portal',
    helplines: [
      { number: '1947', description: 'UIDAI 24x7 Citizen Toll-Free Helpline', tollFree: true }
    ],
    relatedQuestions: [
      'How to update Aadhaar address without address proof using Head of Family?',
      'How to link or change mobile number in Aadhaar card?',
      'How to track Aadhaar update status using URN?'
    ]
  },
  {
    id: 'aadhaar-mobile-biometric-update',
    serviceId: 'aadhaar-update',
    category: 'identity',
    title: 'Aadhaar Mobile Number & Biometric Update (Offline ASK)',
    questionKeywords: [
      'mobile number link', 'change mobile', 'phone link', 'biometric', 'photo update', 
      'iris', 'fingerprint', 'aadhaar seva kendra', 'ask', 'मोबाइल नंबर'
    ],
    content: 
      'Mobile number addition or update in Aadhaar CANNOT be done online because biometric verification is legally required. ' +
      'The applicant must visit an authorized Aadhaar Seva Kendra (ASK) or post office branch in person. ' +
      'No documentary proof is required for mobile number update; only physical biometric authentication (fingerprint/iris) of the holder is required. ' +
      'The official UIDAI fee for biometric update or mandatory biometric update is ₹100. ' +
      'Processing takes up to 7 to 10 working days.',
    actionableSteps: [
      'Book an appointment online at appointments.uidai.gov.in or visit a nearby Aadhaar Seva Kendra or Post Office.',
      'Fill out the Aadhaar Correction/Update Form at the center.',
      'Provide your biometrics (fingerprint / iris scan) to verify identity.',
      'Provide the new 10-digit mobile number to the enrollment operator.',
      'Pay the official fee of ₹50 for mobile update or ₹100 for biometric updates.',
      'Collect the acknowledgment slip with URN number.'
    ],
    requiredDocuments: [
      { name: 'Original Aadhaar Card or Aadhaar number', mandatory: true },
      { name: 'Physical presence of the applicant for biometric scanning', mandatory: true }
    ],
    officialFee: '₹50 for mobile update; ₹100 for biometric/photo update',
    processingTime: '7 to 10 working days',
    eligibility: [
      'Any enrolled Aadhaar card holder',
      'Physical presence at Aadhaar center is compulsory'
    ],
    officialUrl: 'https://appointments.uidai.gov.in',
    officialPortalName: 'UIDAI Appointment Portal',
    helplines: [
      { number: '1947', description: 'UIDAI 24x7 Citizen Toll-Free Helpline', tollFree: true }
    ],
    relatedQuestions: [
      'Can mobile number be updated in Aadhaar online without visiting center?',
      'How to find the nearest Aadhaar Seva Kendra?',
      'What is the fee for child biometric update at age 5 and 15?'
    ]
  },

  // AYUSHMAN BHARAT CHUNKS
  {
    id: 'ayushman-bharat-eligibility-card',
    serviceId: 'ayushman-bharat',
    category: 'healthcare',
    title: 'Ayushman Bharat PM-JAY ₹5 Lakh Cashless Health Card',
    questionKeywords: [
      'ayushman', 'pmjay', 'health card', 'golden card', '5 lakh', 'hospital', 
      'medical insurance', 'free treatment', 'senior citizen 70', 'nha', 'आयुष्मान', 'इलाज'
    ],
    content: 
      'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides cashless health coverage of up to ₹5 lakh per eligible family per year. ' +
      'It covers secondary and tertiary care hospitalization across all empaneled public and private hospitals across India. ' +
      'Eligible groups include families identified under SECC 2011 criteria, active NFSA priority ration card holders, and ALL senior citizens aged 70 and above ' +
      '(under Ayushman Vaya Vandana, regardless of their family income). ' +
      'The Ayushman Golden Card is 100% free of cost at government hospitals and can be downloaded from beneficiary.nha.gov.in using Aadhaar OTP e-KYC. ' +
      'There is no waiting period for pre-existing medical conditions.',
    actionableSteps: [
      'Visit the official National Health Authority beneficiary portal at https://beneficiary.nha.gov.in.',
      'Select "Beneficiary" login, enter your active mobile number, and authenticate with OTP.',
      'Search for your family record by selecting State, Scheme (PMJAY), and searching by Ration Card number, Family ID, or Aadhaar number.',
      'Check if member status shows "Verified" or "Action Required". Click the e-KYC icon.',
      'Complete e-KYC using Aadhaar OTP or Facial Authentication via the Ayushman Mobile App.',
      'Once approved (typically within 24 hours), click "Download Card" to save the digital Ayushman Golden Card PDF.'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Card of the applicant', mandatory: true, tip: 'Used for instant OTP verification' },
      { name: 'Ration Card (NFSA) or Family Samagra ID / Parivar Pehchan Patra', mandatory: true, tip: 'Must be active in state food database' },
      { name: 'Active Mobile Number linked to Aadhaar', mandatory: true }
    ],
    officialFee: '100% Free of Cost (₹0) on government portals and public hospitals',
    processingTime: 'Instant upon e-KYC approval; physical card issuance takes 24 to 48 hours',
    eligibility: [
      'Rural households in SECC 2011 deprivation categories (D1 to D7)',
      'Urban households in 11 defined occupational worker categories',
      'Families enrolled under state NFSA ration card lists',
      'All Indian citizens aged 70 years or above (under Ayushman Vaya Vandana, with no income ceiling)'
    ],
    officialUrl: 'https://beneficiary.nha.gov.in',
    officialPortalName: 'National Health Authority Beneficiary Portal',
    helplines: [
      { number: '14555', description: 'Ayushman Bharat 24x7 National Toll-Free Helpline', tollFree: true },
      { number: '1800-111-565', description: 'NHA Patient Redressal & Hospital Support', tollFree: true }
    ],
    relatedQuestions: [
      'How can senior citizens aged 70+ get the Ayushman card without income limit?',
      'How to search empaneled hospitals near me for cashless admission?',
      'What documents must be presented at the hospital help desk for PM-JAY treatment?'
    ]
  },

  // PM-KISAN CHUNKS
  {
    id: 'pmkisan-ekyc-installment-status',
    serviceId: 'pm-kisan',
    category: 'agriculture',
    title: 'PM-KISAN Samman Nidhi Yojana (₹6,000 / Year)',
    questionKeywords: [
      'pm kisan', 'pmkisan', 'kisan', 'farmer', '6000', 'installment', 'kist', 
      'ekyc', 'land seeding', 'dbt', 'samman nidhi', 'stopped installment', 'किसान', 'किस्त'
    ],
    content: 
      'Under PM-KISAN, eligible small and marginal landholding farmer families receive direct income support of ₹6,000 per year, ' +
      'disbursed in three 4-monthly installments of ₹2,000 each directly into Aadhaar-seeded bank accounts through DBT. ' +
      'To receive installments without interruption, three conditions are mandatory: ' +
      '1) Mandatory e-KYC completed on pmkisan.gov.in via Aadhaar OTP or biometric at CSC. ' +
      '2) Land Seeding status marked YES with revenue land records (Khatauni) verified by the State Nodal Officer. ' +
      '3) Bank account seeded with Aadhaar and mapped to NPCI for Direct Benefit Transfer (DBT). ' +
      'If any installment is stopped, farmers must check "Know Your Status" on pmkisan.gov.in to identify the exact pending verification.',
    actionableSteps: [
      'Visit the official portal at https://pmkisan.gov.in.',
      'Under "Farmers Corner", click "e-KYC", enter your 12-digit Aadhaar number, and submit OTP received on mobile.',
      'To check why money is pending, click "Know Your Status", enter Registration Number or Mobile number.',
      'Verify that all 3 indicators show YES: Land Seeding (YES), e-KYC Done (YES), Aadhaar Bank Account Seeding (YES).',
      'If Land Seeding is NO, submit land records (Khatauni / 7-12) to your local Tehsil or District Agriculture Officer.',
      'If Aadhaar Bank Seeding is NO, visit your bank branch to link your savings account to NPCI DBT.'
    ],
    requiredDocuments: [
      { name: 'Cultivable Land Record (Khatauni / Patta / 7-12 extract in farmer name)', mandatory: true },
      { name: 'Aadhaar Card linked to active mobile phone', mandatory: true },
      { name: 'Bank Passbook linked with Aadhaar and mapped for NPCI DBT', mandatory: true }
    ],
    officialFee: 'Free of Cost (₹0) on pmkisan.gov.in; ₹15 at CSC for biometric e-KYC',
    processingTime: 'Installments released every 4 months (April-July, August-November, December-March)',
    eligibility: [
      'Farmer families with cultivable agricultural land registered in their name',
      'Exclusions: Institutional landholders, government employees, pensioners receiving > ₹10,000/month, income-tax payers'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    officialPortalName: 'PM-KISAN Official Government Portal',
    helplines: [
      { number: '155261', description: 'PM-KISAN Automated Status Helpline', tollFree: true },
      { number: '1800-115-526', description: 'Kisan Call Centre Toll-Free Helpline', tollFree: true }
    ],
    relatedQuestions: [
      'How to link bank account with NPCI for PM-KISAN DBT?',
      'Why did my PM-KISAN 16th or 17th installment stop coming?',
      'How to register as a new farmer on PM-KISAN portal?'
    ]
  },

  // RATION CARD & ONORC CHUNKS
  {
    id: 'ration-card-onorc-application',
    serviceId: 'ration-card',
    category: 'food_civil_supplies',
    title: 'Ration Card & One Nation One Ration Card (ONORC)',
    questionKeywords: [
      'ration card', 'ration', 'rashan', 'onorc', 'quota', 'food grain', 'pds', 
      'fair price shop', 'migrant', 'add member', 'nfsa', 'राशन', 'अनाज'
    ],
    content: 
      'Ration Cards are issued under the National Food Security Act (NFSA) by respective State Food & Civil Supplies Departments. ' +
      'Under the One Nation One Ration Card (ONORC) plan, beneficiaries (especially migrant workers) can collect their entitled subsidized or free food grains ' +
      'from ANY Fair Price Shop (FPS) across India using biometric thumbprint or iris authentication on electronic Point of Sale (e-POS) devices. ' +
      'New ration card applications are processed through state portals listed on nfsa.gov.in. ' +
      'The eldest adult female of the household must be nominated as the Head of the Family as per NFSA law. ' +
      'Application fee ranges from ₹10 to ₹45 depending on the state, and approval takes 20 to 30 days.',
    actionableSteps: [
      'Visit https://nfsa.gov.in and click on "Ration Cards" -> "Ration Card Details on State Portals".',
      'Select your state and create an applicant account on your state food department portal.',
      'Fill in the head of family details (female head mandatory if age 18+) and all dependent members.',
      'Upload Aadhaar copies of all family members, Tehsildar-issued income certificate, and residence proof.',
      'Submit the form and retain the acknowledgment number for inspector verification.',
      'Under ONORC, once card is active, walk into any ration shop nationwide and authenticate via biometric thumbprint to receive grain.'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Card copies of all residing family members', mandatory: true },
      { name: 'Income Certificate issued by Tehsildar or revenue authority', mandatory: true },
      { name: 'Proof of Residence (Electricity bill, voter card, or water bill)', mandatory: true },
      { name: 'Joint family photograph', mandatory: true }
    ],
    officialFee: 'Nominal application fee ₹10 to ₹45 depending on the State Government',
    processingTime: '20 to 30 days following physical verification by Food Inspector',
    eligibility: [
      'Resident families falling under state Priority Household (PHH) or Antyodaya (AAY) income criteria',
      'No member should hold an existing active ration card anywhere in India',
      'Migrant workers can lift ration anywhere in India without changing card'
    ],
    officialUrl: 'https://nfsa.gov.in',
    officialPortalName: 'National Food Security Portal (NFSA)',
    helplines: [
      { number: '1967', description: 'National Food & PDS Toll-Free Helpline', tollFree: true }
    ],
    relatedQuestions: [
      'How to add a newborn baby to an existing ration card?',
      'How can a migrant worker take ration in another state using ONORC?',
      'How to check ration card status and monthly food quota online?'
    ]
  },

  // DIGILOCKER CHUNKS
  {
    id: 'digilocker-dl-pan-legal-validity',
    serviceId: 'digilocker',
    category: 'documents',
    title: 'DigiLocker Legal Validity & Document Fetch',
    questionKeywords: [
      'digilocker', 'driving license', 'dl', 'rc', 'vehicle', 'pan', 'pan card', 
      'marksheet', 'legal validity', 'traffic police', 'it rules', 'डिजिलॉकर', 'लाइसेंस'
    ],
    content: 
      'DigiLocker is an official initiative under Digital India (Ministry of Electronics & IT). ' +
      'Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016, ' +
      'issued documents available in DigiLocker are treated at par with original physical documents. ' +
      'Traffic police, transport authorities, and airport security are mandated by law to accept digital Driving Licenses and Vehicle RCs displayed in DigiLocker. ' +
      'Citizens can instantly link and fetch Driving Licenses from MoRTH, PAN Cards from the Income Tax Department, and marksheets from CBSE and State Boards. ' +
      'The service is 100% free with 1 GB of secure cloud storage.',
    actionableSteps: [
      'Open https://www.digilocker.gov.in or download the official DigiLocker app on Android/iOS.',
      'Sign Up using your 12-digit Aadhaar number and verify with mobile OTP. Set a 6-digit security PIN.',
      'Go to "Search Documents", select "Ministry of Road Transport and Highways" for Driving License or Vehicle Registration (RC).',
      'Enter your DL number or Vehicle Registration number and click "Get Document".',
      'The document is fetched directly from the government database and stored in "Issued Documents" with a digital cryptographic QR code.'
    ],
    requiredDocuments: [
      { name: '12-digit Aadhaar number with linked mobile for OTP login', mandatory: true },
      { name: 'Document identifier (e.g. DL number, PAN number, or Board Roll number)', mandatory: true }
    ],
    officialFee: '100% Free of Cost (₹0)',
    processingTime: 'Instant (Real-time digital fetch from government issuers)',
    eligibility: [
      'Any Indian citizen with an Aadhaar number',
      'Documents can only be fetched if the name on the document matches Aadhaar'
    ],
    officialUrl: 'https://www.digilocker.gov.in',
    officialPortalName: 'DigiLocker Official Portal',
    helplines: [
      { number: '011-24301851', description: 'DigiLocker National Helpdesk', tollFree: false }
    ],
    relatedQuestions: [
      'Is DigiLocker Driving License legally accepted by Traffic Police under Motor Vehicles Act?',
      'How to download Class 10 and 12 CBSE marksheets on DigiLocker?',
      'How to link e-PAN card with DigiLocker?'
    ]
  },

  // PASSPORT SEVA CHUNKS
  {
    id: 'passport-application-tatkaal-normal',
    serviceId: 'passport-seva',
    category: 'travel',
    title: 'Passport Seva - Application Procedure & Tatkaal Scheme',
    questionKeywords: [
      'passport', 'psk', 'tatkaal', 'tatkal', 'normal passport', 'appointment', 
      'police verification', 'travel', 'passport fee', 'non-ecr', 'पासपोर्ट'
    ],
    content: 
      'Indian passports are issued by the Consular, Passport and Visa Division of the Ministry of External Affairs through Passport Seva Kendras (PSK). ' +
      'Two application schemes are available: ' +
      '1) Normal Scheme: Official fee is ₹1,500 for a fresh 36-page adult booklet. Processing takes 10 to 20 working days post police verification. ' +
      '2) Tatkaal Scheme: Requires an additional ₹2,000 fee (total ₹3,500). Passports are dispatched within 1 to 3 working days with post-police verification. ' +
      'Applicants must register online at passportindia.gov.in, pay the fee online, and book an appointment slot at their nearest PSK or Post Office PSK (POPSK). ' +
      'Original documents (Aadhaar, address proof, 10th marksheet for Non-ECR status) must be carried in person.',
    actionableSteps: [
      'Register on the official portal https://www.passportindia.gov.in and login with user credentials.',
      'Click "Apply for Fresh Passport / Re-issue of Passport" and select Normal or Tatkaal.',
      'Fill in applicant personal details, family details, and address history carefully.',
      'Pay the online fee (₹1,500 for Normal) via SBI e-Pay, internet banking, or UPI.',
      'Book an appointment slot at your nearest PSK or POPSK and print the appointment confirmation.',
      'Visit the PSK 15 minutes before the slot with original Aadhaar, address proof, and 10th marksheet.'
    ],
    requiredDocuments: [
      { name: 'Proof of Date of Birth (Birth Certificate, Aadhaar, or 10th School Passing Certificate)', mandatory: true },
      { name: 'Proof of Present Address (Aadhaar, Voter ID, Scheduled Bank Passbook, or Electricity bill)', mandatory: true },
      { name: 'Non-ECR Eligible Document (10th Standard or Higher Marksheet)', mandatory: false, tip: 'Without 10th marksheet, passport is issued with ECR stamp' }
    ],
    officialFee: '₹1,500 for Normal 36-page booklet; ₹3,500 for Tatkaal (₹1,500 online + ₹2,000 at PSK)',
    processingTime: 'Normal: 10 to 20 days; Tatkaal: 1 to 3 days',
    eligibility: [
      'Indian citizen by birth, descent, or naturalization',
      'No pending criminal proceedings in any court under Passports Act 1967'
    ],
    officialUrl: 'https://www.passportindia.gov.in',
    officialPortalName: 'Passport Seva Official Portal',
    helplines: [
      { number: '1800-258-1800', description: 'National Passport Call Centre (Toll-Free 8 AM - 10 PM)', tollFree: true }
    ],
    relatedQuestions: [
      'What documents are needed for minor or child passport?',
      'What is the difference between ECR and Non-ECR passport status?',
      'How does police verification work after PSK appointment?'
    ]
  },

  // VOTER ID CHUNKS
  {
    id: 'voter-id-form6-epic-download',
    serviceId: 'voter-id',
    category: 'elections',
    title: 'Voter ID Card Registration (Form 6) & Digital e-EPIC',
    questionKeywords: [
      'voter id', 'voter card', 'epic', 'form 6', 'election', 'vote', 'e-epic', 
      'voter list', 'matdata', 'eci', 'वोटर', 'मतदाता', 'पहचान पत्र'
    ],
    content: 
      'Indian citizens who have reached 18 years of age can register as new voters using Form 6 on the Election Commission of India (ECI) portal (voters.eci.gov.in). ' +
      'Registration and delivery of the physical colored plastic voter card via Speed Post is 100% Free of Cost (₹0). ' +
      'Once verified by the local Booth Level Officer (BLO), applicants can immediately download their legally valid digital e-EPIC voter card in PDF format. ' +
      'Form 8 is used for updating address or correcting existing voter details.',
    actionableSteps: [
      'Visit the official ECI Voters portal at https://voters.eci.gov.in or download the Voter Helpline App.',
      'Sign up using your mobile number and OTP.',
      'Select "Form 6 - Register as a new elector/voter".',
      'Fill in State, District, Assembly Constituency, personal name, date of birth, and current address.',
      'Upload a passport-sized photograph and Aadhaar card (serves as age and residence proof).',
      'Submit the form and copy the Reference ID to track BLO door-to-door verification.'
    ],
    requiredDocuments: [
      { name: 'Recent passport-size color photograph (white background)', mandatory: true },
      { name: 'Proof of Age & Address (Aadhaar Card, 10th marksheet, or driving license)', mandatory: true }
    ],
    officialFee: '100% Free of Cost (₹0); Free physical card delivery via India Post',
    processingTime: '15 to 30 days following Booth Level Officer (BLO) verification',
    eligibility: [
      'Indian citizen who has attained 18 years on the qualifying date',
      'Ordinary resident of the polling constituency'
    ],
    officialUrl: 'https://voters.eci.gov.in',
    officialPortalName: 'ECI Voters’ Service Portal',
    helplines: [
      { number: '1950', description: 'Election Commission of India Toll-Free Voter Helpline', tollFree: true }
    ],
    relatedQuestions: [
      'How to download digital e-EPIC card on mobile phone?',
      'How to change address in Voter ID card using Form 8?',
      'How to search your name in the electoral roll voter list?'
    ]
  },

  // PM AWAS YOJANA CHUNKS
  {
    id: 'pm-awas-subsidy-pucca-house',
    serviceId: 'pm-awas',
    category: 'housing',
    title: 'Pradhan Mantri Awas Yojana (PMAY) - Housing for All',
    questionKeywords: [
      'pmay', 'awas', 'housing', 'pucca house', 'makan', 'ghar', 'subsidy', 
      'awas gramin', 'pmaymis', 'home loan subsidy', 'आवास', 'मकान'
    ],
    content: 
      'Pradhan Mantri Awas Yojana (PMAY) provides financial subsidies of ₹1.2 lakh (PMAY-Gramin) to ₹2.67 lakh (PMAY-Urban) ' +
      'to economically weaker sections and low-income families for the construction or purchase of a pucca house. ' +
      'To qualify, the family must not own a pucca house anywhere in India in the name of any member. ' +
      'Ownership or co-ownership by a female member is prioritized or mandatory. ' +
      'Funds are not given in cash; they are transferred directly through DBT in construction stages (Foundation, Lintel, and Completion) ' +
      'linked with mandatory geotagged physical inspections by government officials. ' +
      'Applications are routed through local Gram Panchayats (Rural) or Nagar Palikas (Urban).',
    actionableSteps: [
      'Check if your family is listed in the SECC / Awas+ survey on pmaymis.gov.in (urban) or pmayg.nic.in (rural).',
      'Contact your local Gram Panchayat secretary (rural) or municipal corporation/Nagar Palika office (urban).',
      'Submit the application form along with land ownership papers, income proof, and Aadhaar cards of all members.',
      'Government inspection team visits the plot to capture geotagged photographs of the unconstructed site.',
      'Upon sanction, funds are credited via direct DBT in 3 construction milestones directly into your bank account.'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Cards of all residing family members', mandatory: true },
      { name: 'Proof of land/plot ownership where house is to be built', mandatory: true },
      { name: 'Income Certificate or BPL Ration Card', mandatory: true },
      { name: 'DBT-enabled Bank Passbook first page copy', mandatory: true }
    ],
    officialFee: 'Free of Cost (₹0) for government subsidy application',
    processingTime: '2 to 3 months for survey verification; disbursed in construction stages',
    eligibility: [
      'Family must not own a pucca house anywhere in India',
      'Annual family income up to ₹3 lakh (EWS) or ₹6 lakh (LIG)',
      'Female ownership or co-ownership of the house is prioritized/mandatory'
    ],
    officialUrl: 'https://pmaymis.gov.in',
    officialPortalName: 'PMAY Official Portal',
    helplines: [
      { number: '1800-11-6163', description: 'PMAY Urban Citizen Toll-Free Helpline', tollFree: true },
      { number: '1800-11-6446', description: 'PMAY Gramin Citizen Toll-Free Support', tollFree: true }
    ],
    relatedQuestions: [
      'How to check name in PMAY Gramin beneficiary list online?',
      'How many installments are paid during PMAY house construction?',
      'What is the Credit Linked Subsidy Scheme (CLSS) for home loans?'
    ]
  }
];
