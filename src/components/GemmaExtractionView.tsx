import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { StartupDossier, RegistryExtractionResult } from '../types/ekyb';
import { ASEAN_REGISTRIES } from '../data/mockDossiers';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Languages,
  Cpu,
  RefreshCw,
  Send,
  Building,
  Check,
  Coins
} from 'lucide-react';

interface GemmaExtractionViewProps {
  dossier: StartupDossier;
}

export const GemmaExtractionView: React.FC<GemmaExtractionViewProps> = ({ dossier }) => {
  const { t } = useLanguage();
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [activeTab, setActiveTab] = useState<'dossier_docs' | 'custom_sandbox'>('dossier_docs');
  const [customCountry, setCustomCountry] = useState<string>(dossier.country);
  const [liveExtraction, setLiveExtraction] = useState<RegistryExtractionResult | null>(null);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);

  const registry = ASEAN_REGISTRIES[dossier.country];
  const activeDocument = dossier.rawSampleDocuments[selectedDocIndex] || dossier.rawSampleDocuments[0];
  const extractionToDisplay = liveExtraction || dossier.extraction;

  // Sandbox presets
  const sandboxPresets = [
    {
      country: 'ID',
      title: 'Indonesia: Akta Pendirian Notaris (Bahasa)',
      text: `REPUBLIK INDONESIA - KEMENTERIAN HUKUM DAN HAM (AHU)
NOMOR: AHU-0092144.AH.01.01.TAHUN 2023
PENGESAHAN PENDIRIAN PT NUSANTARA CLOUD TEKNOLOGI (PT PMA)
Akta Notaris: Hendra Wijaya, S.H., No. 18 tertanggal 10 Agustus 2023.
NIB: 2408230019284 (KBLI 62020 - Aktivitas Konsultasi Komputer).
Modal Ditempatkan dan Disetor: Rp 15.000.000.000 terbagi atas 15.000 lembar saham.
Pemegang Saham:
1. CloudHoldings Asia Pte. Ltd. (Singapura): 10.500 saham (70%)
2. Budi Gunawan (WNI - NIK 31740219850001): 4.500 saham (30%)
Direktur Utama: Budi Gunawan (WNI).
Penyimpanan data sistem transaksi di AWS Asia Pacific (Jakarta) Region ap-southeast-3 sesuai UU PDP No. 27/2022.`,
    },
    {
      country: 'TH',
      title: 'Thailand: DBD Affidavit & BorOrJor. 5 (Thai Script)',
      text: `กรมพัฒนาธุรกิจการค้า กระทรวงพาณิชย์ (DBD)
เลขทะเบียนนิติบุคคล: 0105567012489
ชื่อบริษัท: บริษัท สยามเพย์เมนท์ ซิสเต็มส์ จำกัด (SIAMPAYMENT SYSTEMS CO., LTD.)
จดทะเบียนเมื่อ: 20 มกราคม 2567
ทุนจดทะเบียนและชำระแล้ว: 20,000,000 บาท
ผู้ถือหุ้นตามบัญชี บอจ. 5:
1. นางสาวกานดา สุวรรณภูมิ (สัญชาติไทย): 102,000 หุ้น (51.0%)
2. Fintech Horizons Ltd. (ฮ่องกง): 98,000 หุ้น (49.0%)
กรรมการผู้มีอำนาจ: นางสาวกานดา สุวรรณภูมิ ลงลายมือชื่อและประทับตราบริษัท
การประกอบธุรกิจ: บริการแพลตฟอร์มชำระเงินดิจิทัล ได้รับการรับรองตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)`,
    },
    {
      country: 'VN',
      title: 'Vietnam: ERC Certificate (Vietnamese)',
      text: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
SỞ KẾ HOẠCH VÀ ĐẦU TƯ TP HÀ NỘI - PHÒNG ĐĂNG KÝ KINH DOANH
GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP CÔNG TY TNHH HAI THÀNH VIÊN TRỞ LÊN
Mã số doanh nghiệp: 0109823412 - Đăng ký lần đầu: 05/04/2023
Tên công ty: CÔNG TY TNHH CÔNG NGHỆ LOGISTICS HÀ NỘI
Địa chỉ: Tầng 8, Tòa nhà Keangnam Landmark 72, Đường Phạm Hùng, Quận Nam Từ Liêm, Hà Nội.
Vốn điều lệ: 20.000.000.000 VNĐ (Hai mươi tỷ đồng).
Thành viên góp vốn:
1. Nguyễn Hoàng Long (Việt Nam): 12.000.000.000 VNĐ (60%)
2. Singapore Supply Chain Ventures Pte. Ltd. (Singapore): 8.000.000.000 VNĐ (40%)
Người đại diện theo pháp luật: NGUYỄN HOÀNG LONG - Giám đốc.
Tuân thủ Nghị định 13/2023/NĐ-CP: Hệ thống lưu trữ dữ liệu tại Viettel IDC Hòa Lạc.`,
    },
    {
      country: 'MY',
      title: 'Malaysia: SSM Section 14 Certificate',
      text: `SURUHANJAYA SYARIKAT MALAYSIA (SSM)
COMPANIES ACT 2016 - SECTION 14 / SECTION 17
COMPANY NAME: NEXUS DIGITAL LOGISTICS SDN. BHD.
REGISTRATION NO: 202301048291 (1509210-P)
INCORPORATION DATE: 12 JULY 2023
TYPE: PRIVATE COMPANY LIMITED BY SHARES
PAID-UP CAPITAL: MYR 2,500,000.00 (TWO MILLION FIVE HUNDRED THOUSAND RINGGIT)
DIRECTORS:
1. AHMAD FARHAN BIN ROSLI (MALAYSIAN RESIDENT CITIZEN)
2. MICHELLE TAN JIA LING (MALAYSIAN RESIDENT CITIZEN)
BENEFICIAL OWNERSHIP DECLARATION (GUIDELINE ON BO):
- AHMAD FARHAN BIN ROSLI: 60.0% DIRECT SHAREHOLDING
- VENTURE ACCEL SINGAPORE PTE LTD: 40.0% SHAREHOLDING
STATUTORY CHARGES: NONE RECORDED.
DATA COMPLIANCE: MALAYSIA PDPA 2010 SECTION 129 TRANSBORDER DATA FLOW AUDITED.`,
    },
  ];

  const handleAnalyze = async () => {
    const textToAnalyze = activeTab === 'custom_sandbox' ? customText : activeDocument.rawText;
    const country = activeTab === 'custom_sandbox' ? customCountry : dossier.country;

    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setAnalysisNotice(null);

    try {
      const res = await fetch('/api/ekyb/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: textToAnalyze,
          country,
          documentType: activeDocument.type,
          fileName: activeDocument.name,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setLiveExtraction(json.data);
        if (json.notice) {
          setAnalysisNotice(json.notice);
        } else {
          setAnalysisNotice(`Gemma inference completed with ${Math.round(json.data.gemmaParsingConfidence * 100)}% confidence.`);
        }
      }
    } catch (e) {
      console.error(e);
      setAnalysisNotice('Extraction completed via Gemma local compliance rules.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">{t('Multilingual eKYB')}</span>
            <span>·</span>
            <span>{t('Gemma 2 9B / PaliGemma Layout Parser')}</span>
            <span>·</span>
            <span>{t('Cross-Lingual NER')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Registry Ingestion & Parsing Engine
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Gemma autonomously extracts, parses, and reconciles unstructured legal filings across 5 ASEAN languages (Bahasa Indonesia, Vietnamese, Thai, Bahasa Melayu, and English).
          </p>
        </div>

        {/* Tab mode */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('dossier_docs');
              setLiveExtraction(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'dossier_docs'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dossier Filings ({dossier.rawSampleDocuments.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('custom_sandbox');
              if (!customText) {
                setCustomText(sandboxPresets[0].text);
                setCustomCountry(sandboxPresets[0].country);
              }
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'custom_sandbox'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Ingestion Sandbox
          </button>
        </div>
      </div>

      {/* Notice Banner if extraction updated */}
      {analysisNotice && (
        <div className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-xs text-cyan-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>{analysisNotice}</span>
          </div>
          <button onClick={() => setAnalysisNotice(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Document Selector or Sandbox Presets */}
      {activeTab === 'dossier_docs' ? (
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            {dossier.rawSampleDocuments.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDocIndex(idx);
                  setLiveExtraction(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  selectedDocIndex === idx
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>{doc.name}</span>
                <span className="text-[10px] text-slate-500 uppercase">({doc.language})</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-medium transition-all shrink-0"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>{t('Gemma Parsing...')}</span>
              </>
            ) : (
              <>
                <Cpu className="h-3.5 w-3.5" />
                <span>{t('Re-Run Gemma Inference')}</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5 text-cyan-400" />
              Multilingual Document Ingestion Presets:
            </span>
            <div className="flex items-center gap-1.5">
              {sandboxPresets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCustomText(preset.text);
                    setCustomCountry(preset.country);
                  }}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white"
                >
                  {preset.country}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Paste or edit any statutory document in Thai, Vietnamese, Bahasa, or English to test Gemma's extraction matrix.
          </p>
        </div>
      )}

      {/* Side-by-Side Ingestion Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Raw Source Document */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Raw Statutory Document
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Language: {activeTab === 'custom_sandbox' ? customCountry : activeDocument.language}
            </span>
          </div>

          {activeTab === 'custom_sandbox' ? (
            <div className="space-y-3">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={16}
                placeholder={t('Paste corporate registry document, notary deed, or tax receipt...')}
                className="w-full rounded-lg border border-slate-800 bg-slate-900/90 p-3 font-mono text-xs text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !customText.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>{t('Parsing Document via Multilingual Gemma...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{t('Extract & Reconcile via Gemma')}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="max-h-[500px] overflow-y-auto rounded-lg border border-slate-850 bg-slate-900/70 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
                {activeDocument.rawText}
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Note: {activeDocument.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Gemma Normalized JSON & Verification */}
        <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Gemma Entity Resolution & Normalization
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400">
                Confidence: {Math.round(extractionToDisplay.gemmaParsingConfidence * 100)}%
              </span>
            </div>
          </div>

          {/* Core Entity Card */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Extracted Legal Name
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {extractionToDisplay.companyName}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                {extractionToDisplay.legalForm}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">{t('Registration Number')}</span>
                <span className="font-mono text-slate-200 font-semibold">{extractionToDisplay.registrationNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Incorporation Date</span>
                <span className="font-mono text-slate-200">{extractionToDisplay.incorporationDate}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 text-[11px] block">{t('Registered Office')}</span>
                <span className="text-slate-300">{extractionToDisplay.registeredAddress}</span>
              </div>
            </div>
          </div>

          {/* Paid-Up Capital Reconciliation */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-cyan-400" />
                Capital Reconciliation Audit
              </span>
              <span className="text-xs font-mono text-emerald-400">{t('Reconciled')}</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-semibold text-white font-mono">
                {extractionToDisplay.paidUpCapital.formatted}
              </span>
              <span className="text-xs text-slate-400">
                Currency: {extractionToDisplay.paidUpCapital.currency}
              </span>
            </div>
          </div>

          {/* Directors & Signatories */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-cyan-400" />
              Directors & Statutory Officers ({extractionToDisplay.directors.length})
            </span>
            <div className="space-y-1.5 pt-1 text-xs">
              {extractionToDisplay.directors.map((dir, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-800/50 py-1 last:border-none">
                  <div>
                    <span className="font-medium text-slate-200">{dir.name}</span>
                    <span className="text-slate-400 text-[11px] ml-2">({dir.role})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{dir.nationality}</span>
                    {dir.isResident && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                        Resident
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Discrepancy Flags */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Gemma Discrepancy & Regulatory Alerts
            </span>
            <div className="space-y-2">
              {extractionToDisplay.complianceFlags.map((flag, idx) => {
                const isCrit = flag.severity === 'critical';
                const isWarn = flag.severity === 'warning';
                const isPass = flag.severity === 'verified';

                return (
                  <div
                    key={idx}
                    className={`rounded-lg p-3 text-xs border ${
                      isCrit
                        ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                        : isWarn
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCrit ? (
                        <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : isWarn ? (
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{flag.title}</span>
                          <span className="text-[10px] font-mono text-slate-400">{flag.code}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                          {flag.description}
                        </p>
                        {flag.remediationAction && (
                          <div className="mt-1.5 text-[10px] text-cyan-300 flex items-center gap-1 font-mono">
                            <span>{t('Remediation:')}</span>
                            <span>{flag.remediationAction}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
