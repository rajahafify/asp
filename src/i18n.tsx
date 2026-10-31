import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'ms' | 'id' | 'th' | 'vi';

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
];

type TranslationKey =
  | 'search.placeholder'
  | 'nav.profile'
  | 'nav.challenges'
  | 'nav.deals'
  | 'nav.notifications'
  | 'nav.ekyb'
  | 'nav.settings'
  | 'nav.postSolution'
  | 'language.label';

const DICTIONARY: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    'search.placeholder': 'Search for challenges, investors or partners...',
    'nav.profile': 'My Profile',
    'nav.challenges': 'Challenges',
    'nav.deals': 'Deal Tracker',
    'nav.notifications': 'Notifications',
    'nav.ekyb': 'eKYB Verification',
    'nav.settings': 'Settings',
    'nav.postSolution': 'Post Your Solution',
    'language.label': 'Language',
  },
  ms: {
    'search.placeholder': 'Cari cabaran, pelabur atau rakan kongsi...',
    'nav.profile': 'Profil Saya',
    'nav.challenges': 'Cabaran',
    'nav.deals': 'Penjejak Perjanjian',
    'nav.notifications': 'Pemberitahuan',
    'nav.ekyb': 'Pengesahan eKYB',
    'nav.settings': 'Tetapan',
    'nav.postSolution': 'Hantar Penyelesaian Anda',
    'language.label': 'Bahasa',
  },
  id: {
    'search.placeholder': 'Cari tantangan, investor, atau mitra...',
    'nav.profile': 'Profil Saya',
    'nav.challenges': 'Tantangan',
    'nav.deals': 'Pelacak Kesepakatan',
    'nav.notifications': 'Notifikasi',
    'nav.ekyb': 'Verifikasi eKYB',
    'nav.settings': 'Pengaturan',
    'nav.postSolution': 'Kirim Solusi Anda',
    'language.label': 'Bahasa',
  },
  th: {
    'search.placeholder': 'ค้นหาความท้าทาย นักลงทุน หรือพันธมิตร...',
    'nav.profile': 'โปรไฟล์ของฉัน',
    'nav.challenges': 'ความท้าทาย',
    'nav.deals': 'ติดตามดีล',
    'nav.notifications': 'การแจ้งเตือน',
    'nav.ekyb': 'การยืนยัน eKYB',
    'nav.settings': 'การตั้งค่า',
    'nav.postSolution': 'ส่งโซลูชันของคุณ',
    'language.label': 'ภาษา',
  },
  vi: {
    'search.placeholder': 'Tìm thử thách, nhà đầu tư hoặc đối tác...',
    'nav.profile': 'Hồ sơ của tôi',
    'nav.challenges': 'Thử thách',
    'nav.deals': 'Theo dõi giao dịch',
    'nav.notifications': 'Thông báo',
    'nav.ekyb': 'Xác minh eKYB',
    'nav.settings': 'Cài đặt',
    'nav.postSolution': 'Đăng giải pháp của bạn',
    'language.label': 'Ngôn ngữ',
  },
};

const STORAGE_KEY = 'asp_language';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readStoredLanguage = (): LanguageCode => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return LANGUAGES.some((l) => l.code === stored) ? (stored as LanguageCode) : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage);

  const setLanguage = (code: LanguageCode) => {
    localStorage.setItem(STORAGE_KEY, code);
    setLanguageState(code);
  };

  const t = (key: TranslationKey) => DICTIONARY[language][key] ?? DICTIONARY.en[key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
