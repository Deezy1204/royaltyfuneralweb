"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePortal } from "@/app/portal/layout";
import { db } from "@/lib/firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { safeFetchByClientId } from "@/lib/firebase-utils";
import { FileText, Receipt as ReceiptIcon, FileCheck, Printer, ChevronDown, ChevronUp, Shield } from "lucide-react";

import { 
  PolicyDocument, 
  PaymentReceipt, 
  ClaimDocument,
} from "@/components/portal/PrintableDocuments";
import { renderToString } from "react-dom/server";

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-ZW", { day: "2-digit", month: "long", year: "numeric" });
}

function formatCurrency(amount: number) {
  return `$${(amount || 0).toFixed(2)}`;
}

function PrintableSection({ 
  title, 
  type, 
  data 
}: { 
  title: string; 
  type: 'policy' | 'receipt' | 'claim';
  data: any;
}) {
  const handlePrint = () => {
    let content = "";
    if (type === 'policy') {
      content = renderToString(<PolicyDocument client={data.client} policy={data.policy} />);
    } else if (type === 'receipt') {
      content = renderToString(<PaymentReceipt client={data.client} policy={data.policy} payment={data.payment} />);
    } else if (type === 'claim') {
      content = renderToString(<ClaimDocument client={data.client} policy={data.policy} claim={data.claim} />);
    }

    const win = window.open("", "_blank");
    if (!win) return;
    
    win.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              @page { margin: 0; size: auto; }
              body { margin: 1.6cm; background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .page-break-after { page-break-after: always; }
              .page-break-before { page-break-before: always; }
              .no-print { display: none !important; }
            }
            body { font-family: 'Inter', sans-serif; background: #f9f9f9; padding: 40px; }
            @media print { body { background: white; padding: 0; } }
          </style>
        </head>
        <body>
          <div class="max-w-[1000px] mx-auto shadow-2xl print:shadow-none bg-white">
            ${content}
          </div>
          <script>
            // Wait for Tailwind to process classes
            setTimeout(() => {
              window.print();
              // window.close(); // Optional: close after printing
            }, 1000);
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 text-sm text-[#1e3a8a] hover:text-blue-800 font-bold transition-colors"
    >
      <Printer size={16} /> Print / Save PDF
    </button>
  );
}

function AccordionCard({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Icon size={20} />
          </div>
          <h2 className="font-serif text-2xl text-primary-dark">{title}</h2>
        </div>
        {open ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {open && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-6 pb-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function MyDocuments() {
  const { client, policy } = usePortal();
  const [payments, setPayments] = useState<Record<string, any>>({});
  const [claims, setClaims] = useState<Record<string, any>>({});
  const [declarations, setDeclarations] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) return;
    const fetchAll = async () => {
      const [pmtSnap, claimSnap, declSnap] = await Promise.all([
        safeFetchByClientId("payments", client.clientId),
        safeFetchByClientId("claims", client.clientId),
        safeFetchByClientId("declarations", client.clientId),
      ]);
      if (pmtSnap.exists()) setPayments(pmtSnap.val());
      if (claimSnap.exists()) setClaims(claimSnap.val());
      if (declSnap.exists()) setDeclarations(declSnap.val());
      setLoading(false);
    };
    fetchAll();
  }, [client]);

  if (!client || !policy) return null;

  const paymentList = Object.entries(payments).sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const claimList = Object.entries(claims);
  const declarationList = Object.entries(declarations);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-primary-dark mb-2">My Documents</h1>
        <p className="text-text-muted text-lg font-light">Securely manage, view, and print your official policy documents and receipts.</p>
      </header>

      {loading && (
        <div className="flex items-center gap-3 text-primary animate-pulse">
          <div className="w-2 h-2 bg-current rounded-full"></div>
          <p className="text-sm font-medium">Updating document list...</p>
        </div>
      )}

      {/* Policy Document */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <AccordionCard title="Policy Documents" icon={Shield} defaultOpen={true}>
          <div className="space-y-6">
            <div className="bg-gray-50/50 rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Official Policy Package</h3>
                  <p className="text-sm text-gray-500">Includes Acceptance Letter, Schedule, and Terms & Conditions</p>
                </div>
              </div>
              <PrintableSection 
                title="Policy Document" 
                type="policy" 
                data={{ client, policy }} 
              />
            </div>
            
            {/* Visual Preview (Compact) */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-inner h-[400px] relative">
              <div className="absolute inset-0 overflow-y-auto p-4 md:p-12 scale-[0.6] origin-top transform-gpu pointer-events-none opacity-40 grayscale">
                <PolicyDocument client={client} policy={policy} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex items-end justify-center pb-8">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 px-4 py-2 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest shadow-sm">
                  Full Preview Available in Print / PDF
                </div>
              </div>
            </div>
          </div>
        </AccordionCard>
      </motion.div>

      {/* Payment Receipts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <AccordionCard title="Payment History & Receipts" icon={ReceiptIcon}>
          {paymentList.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <ReceiptIcon size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No payment records found.</p>
              <p className="text-xs text-gray-400 mt-1">If you just made a payment, it may take a few minutes to appear.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {paymentList.map(([key, p]) => (
                <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-[#1e3a8a]/20 transition-all duration-300 space-y-4 sm:space-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <ReceiptIcon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{formatCurrency(p.amount)}</p>
                      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">#{p.receiptNumber || key.slice(-6)} · {formatDate(p.date)}</p>
                    </div>
                  </div>
                  <PrintableSection 
                    title={`Receipt - ${p.receiptNumber || key}`} 
                    type="receipt" 
                    data={{ client, policy, payment: p }} 
                  />
                </div>
              ))}
            </div>
          )}
        </AccordionCard>
      </motion.div>

      {/* Claims */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <AccordionCard title="Claims & Declarations" icon={FileCheck}>
          {claimList.length === 0 && declarationList.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <FileCheck size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No claims or declarations found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {claimList.map(([key, c]) => (
                <div key={key} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                        <FileCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{c.claimType}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-black">{formatDate(c.claimDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full ${c.status === "APPROVED" ? "bg-green-100 text-green-700" : c.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                        {c.status}
                      </span>
                      <PrintableSection 
                        title={`Claim - ${key}`} 
                        type="claim" 
                        data={{ client, policy, claim: { ...c, deceasedName: c.deceasedName || c.description } }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AccordionCard>
      </motion.div>
    </div>
  );
}
