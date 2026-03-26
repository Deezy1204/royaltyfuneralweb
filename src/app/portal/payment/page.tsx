"use client";

import { motion } from "framer-motion";
import { Copy, CreditCard, Landmark, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { usePortal } from "../layout";

function formatCurrency(amount: number) {
  return `$${(amount || 0).toFixed(2)}`;
}

export default function MakePayment() {
  const { policy } = usePortal();
  const [copied, setCopied] = useState(false);

  if (!policy) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(policy.policyNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <p className="text-gray-600 mb-6 text-sm">Use Paynow to securely process payments via Ecocash, OneMoney, or Local ZimSwitch cards.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay (USD)</label>
                <input type="text" readOnly value={formatCurrency(policy.premiumAmount + (policy.arrearsAmount || 0))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option>Ecocash</option>
                  <option>OneMoney</option>
                  <option>Visa / Mastercard (Local)</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors mt-2 shadow-lg">
                Proceed to Secure Payment
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
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Bank:</span>
                <span className="font-medium text-gray-900">First National Bank (FNB)</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-medium text-gray-900">Royalty Funeral Services SA</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Account No:</span>
                <span className="font-medium text-gray-900 tracking-wider">62123456789</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Branch Code:</span>
                <span className="font-medium text-gray-900">250655</span>
              </div>
              <div className="flex justify-between pt-2 items-center bg-blue-50/50 -mx-6 px-6 pb-2 -mb-6 rounded-b-xl border-t border-blue-100">
                <span className="text-gray-700 font-sans font-medium">Your Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary tracking-wider">{policy.policyNumber}</span>
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
                <span>Arrears</span>
                <span>{formatCurrency(policy.arrearsAmount || 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary-dark pt-3 border-t border-gray-200 mt-2">
                <span>Total Due</span>
                <span>{formatCurrency(policy.premiumAmount + (policy.arrearsAmount || 0))}</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg flex items-start gap-2 border border-yellow-100">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>Please ensure your payment is completed before the 1st of next month to avoid policy suspension.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
