"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePortal } from "@/app/portal/layout";
import { db } from "@/lib/firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { safeFetchByClientId } from "@/lib/firebase-utils";
import { FileText, Receipt, FileCheck, Printer, ChevronDown, ChevronUp, Shield } from "lucide-react";

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-ZW", { day: "2-digit", month: "long", year: "numeric" });
}

function formatCurrency(amount: number) {
  return `$${(amount || 0).toFixed(2)}`;
}

function PrintableSection({ children, title }: { children: React.ReactNode; title: string }) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>${title}</title>
      <style>
        body { font-family: Georgia, serif; color: #111; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 24px; margin-bottom: 4px; }
        h2 { font-size: 18px; color: #3f1a6b; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th { background: #3f1a6b; color: white; padding: 8px 12px; text-align: left; font-size: 13px; }
        td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 13px; }
        .header { border-bottom: 3px solid #5c2d91; margin-bottom: 24px; padding-bottom: 16px; }
        .company { font-size: 22px; font-weight: bold; color: #3f1a6b; }
        .meta { font-size: 12px; color: #666; margin-top: 4px; }
        .badge { display: inline-block; background: #f3e8ff; color: #5c2d91; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        @media print { body { padding: 20px; } }
      </style>
      </head><body>
      <div class="header">
        <div class="company">Royalty Funeral Services</div>
        <div class="meta">Stand 15383, Khami Road Kelvin North 11, Bulawayo | +263 71 787 4750</div>
      </div>
      ${content}
      <p style="margin-top:32px; font-size:11px; color:#999;">Printed on ${new Date().toLocaleDateString("en-ZW")} · This document is computer generated and valid without a signature.</p>
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div>
      <div ref={printRef} className="hidden">{children}</div>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
      >
        <Printer size={16} /> Print / Save PDF
      </button>
    </div>
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon size={18} />
          </div>
          <h2 className="font-serif text-xl text-primary-dark">{title}</h2>
        </div>
        {open ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

export default function MyDocuments() {
  const { client, policy } = usePortal();
  const [payments, setPayments] = useState<Record<string, { amount: number; date: string; method: string; reference?: string; receiptNumber?: string }>>({});
  const [claims, setClaims] = useState<Record<string, { claimType: string; claimDate: string; status: string; amount?: number; description?: string }>>({});
  const [declarations, setDeclarations] = useState<Record<string, { declarationDate: string; declarationType: string; details?: string }>>({});
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

  const dependentsList = policy.dependents ? Object.entries(policy.dependents) : [];

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary-dark mb-1">My Documents</h1>
        <p className="text-text-muted">View and print your policy documents, payment receipts, and claims.</p>
      </header>

      {loading && <p className="text-gray-400 text-sm">Loading your documents...</p>}

      {/* Policy Document */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <AccordionCard title="Policy Document" icon={Shield} defaultOpen={true}>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
              <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Policy Number</span>
                  <span className="font-mono font-medium">{policy.policyNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Plan</span>
                  <span className="font-medium">Royalty {policy.planType} – {policy.policyType}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Policy Holder</span>
                  <span className="font-medium">{client.title} {client.firstName} {client.lastName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Status</span>
                  <span className={`font-semibold ${policy.status === "ACTIVE" ? "text-green-600" : "text-red-500"}`}>{policy.status}</span>
                </div>

                <div>
                  <span className="text-gray-500 block text-xs mb-1">Monthly Premium</span>
                  <span className="font-medium">{formatCurrency(policy.premiumAmount)} / {policy.paymentFrequency.toLowerCase()}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Inception Date</span>
                  <span className="font-medium">{formatDate(policy.inceptionDate)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Renewal Date</span>
                  <span className="font-medium">{formatDate(policy.renewalDate)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Waiting Period Ends</span>
                  <span className="font-medium">{formatDate(policy.waitingPeriodEnd)}</span>
                </div>
              </div>

              {dependentsList.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Covered Dependents</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-xs text-gray-500 py-1 pr-4">Name</th>
                        <th className="text-left text-xs text-gray-500 py-1 pr-4">Relationship</th>
                        <th className="text-left text-xs text-gray-500 py-1">DOB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dependentsList.map(([k, dep]) => (
                        <tr key={k} className="border-b border-gray-100">
                          <td className="py-1 pr-4">{dep.firstName} {dep.lastName}</td>
                          <td className="py-1 pr-4 text-gray-600">{dep.relationship}</td>
                          <td className="py-1 text-gray-600">{formatDate(dep.dateOfBirth)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <PrintableSection title={`Policy Document – ${policy.policyNumber}`}>
              <h1>Policy Document</h1>
              <h2>Policy Number: {policy.policyNumber}</h2>
              <table>
                <tbody>
                  <tr><td><strong>Policy Holder</strong></td><td>{client.title} {client.firstName} {client.lastName}</td></tr>
                  <tr><td><strong>ID Number</strong></td><td>{client.idNumber}</td></tr>
                  <tr><td><strong>Address</strong></td><td>{client.streetAddress}, {client.city}</td></tr>
                  <tr><td><strong>Phone</strong></td><td>{client.phone}</td></tr>
                  <tr><td><strong>Plan</strong></td><td>Royalty {policy.planType} – {policy.policyType}</td></tr>
                  <tr><td><strong>Status</strong></td><td>{policy.status}</td></tr>

                  <tr><td><strong>Premium</strong></td><td>{formatCurrency(policy.premiumAmount)} / {policy.paymentFrequency}</td></tr>
                  <tr><td><strong>Inception Date</strong></td><td>{formatDate(policy.inceptionDate)}</td></tr>
                  <tr><td><strong>Renewal Date</strong></td><td>{formatDate(policy.renewalDate)}</td></tr>
                  <tr><td><strong>Waiting Period Ends</strong></td><td>{formatDate(policy.waitingPeriodEnd)}</td></tr>
                </tbody>
              </table>
              {dependentsList.length > 0 && (
                <>
                  <h2 style={{ marginTop: 24 }}>Covered Dependents</h2>
                  <table>
                    <thead><tr><th>Name</th><th>Relationship</th><th>Date of Birth</th></tr></thead>
                    <tbody>
                      {dependentsList.map(([k, dep]) => (
                        <tr key={k}><td>{dep.firstName} {dep.lastName}</td><td>{dep.relationship}</td><td>{formatDate(dep.dateOfBirth)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </PrintableSection>
          </div>
        </AccordionCard>
      </motion.div>

      {/* Payment Receipts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <AccordionCard title="Payment Receipts" icon={Receipt}>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : paymentList.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No payment records found.</p>
          ) : (
            <div className="space-y-3">
              {paymentList.map(([key, p]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">{formatCurrency(p.amount)}</p>
                    <p className="text-sm text-gray-500">{formatDate(p.date)} · {p.method}</p>
                    {p.reference && <p className="text-xs text-gray-400 font-mono mt-1">Ref: {p.reference}</p>}
                  </div>
                  <PrintableSection title={`Receipt – ${p.receiptNumber || key}`}>
                    <h1>Payment Receipt</h1>
                    <p className="meta">Receipt #: {p.receiptNumber || key}</p>
                    <table>
                      <tbody>
                        <tr><td><strong>Policy Holder</strong></td><td>{client.firstName} {client.lastName}</td></tr>
                        <tr><td><strong>Policy Number</strong></td><td>{policy.policyNumber}</td></tr>
                        <tr><td><strong>Amount Paid</strong></td><td>{formatCurrency(p.amount)}</td></tr>
                        <tr><td><strong>Date</strong></td><td>{formatDate(p.date)}</td></tr>
                        <tr><td><strong>Method</strong></td><td>{p.method}</td></tr>
                        {p.reference && <tr><td><strong>Reference</strong></td><td>{p.reference}</td></tr>}
                      </tbody>
                    </table>
                  </PrintableSection>
                </div>
              ))}
            </div>
          )}
        </AccordionCard>
      </motion.div>

      {/* Claims */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <AccordionCard title="Policy Claims" icon={FileCheck}>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : claimList.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No claim records found for this policy.</p>
          ) : (
            <div className="space-y-3">
              {claimList.map(([key, c]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{c.claimType}</p>
                      <p className="text-sm text-gray-500">{formatDate(c.claimDate)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "APPROVED" ? "bg-green-100 text-green-700" : c.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                        {c.status}
                      </span>
                      <PrintableSection title={`Claim – ${key}`}>
                        <h1>Policy Claim Form</h1>
                        <table>
                          <tbody>
                            <tr><td><strong>Claimant</strong></td><td>{client.firstName} {client.lastName}</td></tr>
                            <tr><td><strong>Policy Number</strong></td><td>{policy.policyNumber}</td></tr>
                            <tr><td><strong>Claim Type</strong></td><td>{c.claimType}</td></tr>
                            <tr><td><strong>Claim Date</strong></td><td>{formatDate(c.claimDate)}</td></tr>
                            <tr><td><strong>Status</strong></td><td>{c.status}</td></tr>
                            {c.amount != null && <tr><td><strong>Amount</strong></td><td>{formatCurrency(c.amount)}</td></tr>}
                            {c.description && <tr><td><strong>Description</strong></td><td>{c.description}</td></tr>}
                          </tbody>
                        </table>
                      </PrintableSection>
                    </div>
                  </div>
                  {c.description && <p className="text-sm text-gray-600 mt-1">{c.description}</p>}
                </div>
              ))}
            </div>
          )}
        </AccordionCard>
      </motion.div>

      {/* Declarations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <AccordionCard title="Declarations" icon={FileText}>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : declarationList.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No declarations found for this policy.</p>
          ) : (
            <div className="space-y-3">
              {declarationList.map(([key, d]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">{d.declarationType}</p>
                    <p className="text-sm text-gray-500">{formatDate(d.declarationDate)}</p>
                    {d.details && <p className="text-sm text-gray-600 mt-1">{d.details}</p>}
                  </div>
                  <PrintableSection title={`Declaration – ${key}`}>
                    <h1>Policy Declaration</h1>
                    <table>
                      <tbody>
                        <tr><td><strong>Policy Holder</strong></td><td>{client.firstName} {client.lastName}</td></tr>
                        <tr><td><strong>Policy Number</strong></td><td>{policy.policyNumber}</td></tr>
                        <tr><td><strong>Declaration Type</strong></td><td>{d.declarationType}</td></tr>
                        <tr><td><strong>Date</strong></td><td>{formatDate(d.declarationDate)}</td></tr>
                        {d.details && <tr><td><strong>Details</strong></td><td>{d.details}</td></tr>}
                      </tbody>
                    </table>
                  </PrintableSection>
                </div>
              ))}
            </div>
          )}
        </AccordionCard>
      </motion.div>

    </div>
  );
}
