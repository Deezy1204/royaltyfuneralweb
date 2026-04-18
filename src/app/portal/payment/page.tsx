"use client";

import { motion } from "framer-motion";
import { Copy, CreditCard, Landmark, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { usePortal } from "../layout";

function formatCurrency(amount: number) {
  return `$${(amount || 0).toFixed(2)}`;
}

export default function MakePayment() {
  const { client, policy } = usePortal();
  const [copied, setCopied] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!client || !policy) return null;

  const isInsured = String(client.Insured ?? client.insured ?? "").trim().toLowerCase() === "yes";
  const insuranceFee = isInsured ? 1 : 0;
  const totalDue = Number(policy.premiumAmount || 0) + insuranceFee;

  const handleCopy = () => {
    navigator.clipboard.writeText(policy.policyNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGatewaySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaymentError("");
    setIsSubmitting(true);

    const PAYMENTS_API_URL = process.env.NEXT_PUBLIC_PAYMENTS_API_URL?.replace(/\/+$/, "") || "https://royaltyfuneral.com";
    const paymentEndpoint = `${PAYMENTS_API_URL}/api/portal/payment/start`;

    try {
      const response = await fetch(paymentEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client,
          policy,
          clientEmail: client.email,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success || !result?.redirectUrl) {
        throw new Error(result?.error || "Unable to start your payment right now.");
      }

      // Store payment info for success page to save to database
      if (typeof window !== "undefined") {
        sessionStorage.setItem("paymentInfo", JSON.stringify({
          clientId: client.clientId,
          policyId: policy.policyId,
          amount: result.amount?.totalAmount || totalDue,
        }));
      }

      window.location.assign(result.redirectUrl);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Unable to start your payment right now.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-primary-dark mb-2">Make a Payment</h1>
        <p className="text-text-muted">Pay your premium securely using our supported local and international methods.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary" size={24} />
              <h2 className="font-serif text-2xl text-primary-dark">Local Gateway Option</h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm">Use Paynow to securely process your premium via Ecocash, OneMoney, or local cards. We will post your client details, payment amount, and policy number reference to start the checkout session.</p>
            
            <form className="space-y-4" onSubmit={handleGatewaySubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay (USD)</label>
                <input type="text" readOnly value={formatCurrency(totalDue)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:outline-none" />
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-gray-700">
                Reference: <span className="font-bold text-primary-dark">{policy.policyNumber}</span>
              </div>
              {paymentError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Starting secure payment..." : "Proceed to Secure Payment"}
              </button>
            </form>
          </motion.div>

          {/* EFT Instructions for SA Diaspora */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="text-primary" size={24} />
              <h2 className="font-serif text-2xl text-primary-dark">SA Diaspora EFT</h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm">For clients based in South Africa, you can make a direct Electronic Funds Transfer (EFT) to our FNB account. <strong className="text-red-500">Crucial:</strong> Use your policy number as the exact reference so we can allocate your payment.</p>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100 space-y-3 font-mono text-xs md:text-sm">
              {[
                ["Bank", "First National Bank (FNB)/ RMB"],
                ["Account Name", "Royalty"],
                ["Account No", "63137398251"],
                ["Branch Code", "250655"],
                ["Own Ref", "Royalty"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-500">{label}:</span>
                  <span className="font-bold text-gray-900">{value}</span>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:justify-between pt-4 items-start sm:items-center bg-blue-50/50 -mx-4 md:-mx-6 px-4 md:px-6 pb-4 -mb-4 md:-mb-6 rounded-b-xl border-t border-blue-100 gap-2">
                <span className="text-gray-700 font-sans font-medium text-sm">Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-primary tracking-wider text-sm">{policy.policyNumber}</span>
                  <button onClick={handleCopy} className="text-gray-400 hover:text-primary transition-colors focus:outline-none ml-2" title="Copy Reference">
                    {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-10 italic">* Allow 2-3 business days for EFT payments to reflect.</p>
          </motion.div>
        </div>

        {/* Sidebar Summary */}
        <div className="md:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-background-cream p-6 rounded-2xl border border-gray-200 sticky top-32"
          >
            <h3 className="font-serif text-xl text-primary-dark mb-4">Payment Summary</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Policy Premium</span>
                <span>{formatCurrency(policy.premiumAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Insurance</span>
                <span>{formatCurrency(insuranceFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary-dark pt-3 border-t border-gray-200 mt-2">
                <span>Total Due</span>
                <span>{formatCurrency(totalDue)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
