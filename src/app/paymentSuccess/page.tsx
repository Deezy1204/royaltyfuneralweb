"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Home, Copy } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PaymentContent from "./content";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col min-h-screen bg-background-cream">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8">
        <div className="container mx-auto">
          <Link href="/" className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center gap-2">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-16 md:py-24 px-4 md:px-8">
        <Suspense fallback={<PaymentLoadingFallback />}>
          <PaymentContent />
        </Suspense>
      </div>
    </div>
  );
}

function PaymentLoadingFallback() {
  return (
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-lg p-12 text-center"
      >
        <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading payment details...</p>
      </motion.div>
    </div>
  );
}
