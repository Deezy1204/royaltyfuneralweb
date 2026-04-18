"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Copy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

function formatCurrency(amount: string | number) {
  const num = Number(amount) || 0;
  return `$${num.toFixed(2)}`;
}

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "pending";
  const reference = searchParams.get("reference") || "";
  const amount = searchParams.get("amount") || "0";
  const transactionId = searchParams.get("transactionId") || searchParams.get("paynowreference") || "";
  const timestamp = searchParams.get("timestamp") || new Date().toISOString();
  const [copied, setCopied] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  // PayNow status values: "paid", "success", "completed", "approved" are success states
  // For testing: you can add ?status=paid to the URL to force success
  const isSuccess = ["paid", "success", "completed", "approved"].includes(status.toLowerCase());

  // Save payment to database on successful payment
  useEffect(() => {
    if (!isSuccess || savingPayment) return;

    const savePayment = async () => {
      setSavingPayment(true);
      try {
        // Get payment info from session storage
        const paymentInfoStr = sessionStorage.getItem("paymentInfo");
        if (!paymentInfoStr) {
          console.warn("Payment info not found in session storage");
          return;
        }

        const paymentInfo = JSON.parse(paymentInfoStr);

        // Call API to save payment
        const response = await fetch("/api/portal/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: paymentInfo.clientId,
            policyId: paymentInfo.policyId,
            amount: Number(amount) || paymentInfo.amount,
            reference,
            transactionId,
            paymentDate: new Date(),
          }),
        });

        if (!response.ok) {
          console.error("Failed to save payment to database");
        }

        // Clear session storage
        sessionStorage.removeItem("paymentInfo");
      } catch (error) {
        console.error("Error saving payment:", error);
      } finally {
        setSavingPayment(false);
      }
    };

    savePayment();
  }, [isSuccess, amount, reference, transactionId, savingPayment]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden"
      >
        {/* Status Section */}
        <div className={`p-8 md:p-12 text-center ${isSuccess ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-gradient-to-br from-red-50 to-rose-50"}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex justify-center mb-6"
          >
            {isSuccess ? (
              <CheckCircle2 size={80} className="text-green-600" strokeWidth={1.5} />
            ) : (
              <XCircle size={80} className="text-red-600" strokeWidth={1.5} />
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`font-serif text-4xl md:text-5xl mb-3 ${isSuccess ? "text-green-700" : "text-red-700"}`}
          >
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-lg ${isSuccess ? "text-green-600" : "text-red-600"}`}
          >
            {isSuccess
              ? "Your payment has been processed successfully. A confirmation email has been sent to you."
              : "Unfortunately, your payment could not be processed. Please try again or contact support."}
          </motion.p>
        </div>

        {/* Payment Details */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 md:p-12 border-t border-gray-200"
          >
            <h2 className="font-serif text-2xl text-primary-dark mb-8">Payment Details</h2>

            <div className="space-y-6">
              {/* Reference */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Policy Reference</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary-dark text-lg">{reference || "—"}</span>
                  {reference && (
                    <button
                      onClick={() => handleCopy(reference)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy reference"
                    >
                      <Copy size={18} className={copied ? "text-green-600" : "text-gray-400"} />
                    </button>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Amount Paid</span>
                <span className="font-bold text-lg text-primary-dark">{formatCurrency(amount)}</span>
              </div>

              {/* Transaction ID */}
              {transactionId && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Transaction ID</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-gray-600 break-all">{transactionId}</span>
                    <button
                      onClick={() => handleCopy(transactionId)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                      title="Copy transaction ID"
                    >
                      <Copy size={18} className={copied ? "text-green-600" : "text-gray-400"} />
                    </button>
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Date & Time</span>
                <span className="text-gray-700">
                  {new Date(timestamp).toLocaleDateString("en-ZW", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Next Steps:</span> Your payment has been recorded. You will receive a confirmation email shortly with your receipt. Your policy status will be updated within 1-2 business days.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Details */}
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 md:p-12 border-t border-gray-200"
          >
            <div className="space-y-6">
              {reference && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Policy Reference</span>
                  <span className="font-mono font-bold text-gray-700">{reference}</span>
                </div>
              )}

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-900 mb-4">
                  <span className="font-semibold">What went wrong?</span>
                  <br />
                  Your payment could not be processed. This could be due to:
                </p>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li>Insufficient funds in your account</li>
                  <li>Incorrect card or payment details</li>
                  <li>Network or connectivity issues</li>
                  <li>Payment method not supported</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Need help?</span>
                  <br />
                  Please contact our support team at <a href="tel:+263717874750" className="underline hover:text-amber-700">+263 71 787 4750</a> or email <a href="mailto:royaltyzw.tech@gmail.com" className="underline hover:text-amber-700">royaltyzw.tech@gmail.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
          <Link
            href="/portal/payment"
            className={`flex-1 py-4 px-6 rounded-xl font-medium text-center transition-all ${
              isSuccess
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            {isSuccess ? "Back to Portal" : "Try Payment Again"}
          </Link>
          <Link
            href="/"
            className="flex-1 py-4 px-6 rounded-xl font-medium text-center bg-white text-primary border border-primary hover:bg-primary/5 transition-all"
          >
            Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
