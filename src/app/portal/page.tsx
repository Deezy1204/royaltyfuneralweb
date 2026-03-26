"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortal } from "./layout";
import { db } from "@/lib/firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { safeFetchByClientId } from "@/lib/firebase-utils";
import { Shield, Calendar, DollarSign, Users, CheckCircle2, AlertCircle } from "lucide-react";

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-ZW", { day: "2-digit", month: "long", year: "numeric" });
}

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function PortalDashboard() {
  const { client, policy } = usePortal();
  const [payments, setPayments] = useState<Record<string, { amount: number; date: string; method: string; reference: string }>>({});
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (!client) return;
    safeFetchByClientId("payments", client.clientId).then((snap) => {
      if (snap.exists()) setPayments(snap.val());
    }).finally(() => setLoadingPayments(false));
  }, [client]);

  if (!client || !policy) return null;

  const dependentsList = policy.dependents ? Object.entries(policy.dependents) : [];
  const recentPayments = Object.entries(payments)
    .sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const planColors: Record<string, string> = {
    WHITE: "bg-gray-100 text-gray-700",
    GOLD: "bg-yellow-100 text-yellow-800",
    BLUE: "bg-blue-100 text-blue-800",
    PURPLE: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="space-y-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary-dark mb-1">My Account Overview</h1>
        <p className="text-text-muted">View your policy, profile, and recent activity.</p>
      </header>

      {/* Profile + Policy Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Profile */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-serif text-2xl text-primary-dark mb-6">Profile Details</h2>
          <div className="space-y-3 text-sm">
            {[
              ["Full Name", `${client.title} ${client.firstName} ${client.lastName}`],
              ["Client Number", client.clientNumber],
              ["ID Number", client.idNumber],
              ["Phone", client.phone],
              ["Email", client.email || "—"],
              ["Address", `${client.streetAddress}, ${client.city}`],
              ["Date of Birth", formatDate(client.dateOfBirth)],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-2 border-b border-gray-100 pb-3 sm:pb-2 last:border-0">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider sm:col-span-1">{label}</span>
                <span className="text-gray-900 sm:col-span-2 break-words text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Summary */}
        <div className="bg-primary-dark text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${planColors[policy.planType] || "bg-white/20 text-white"}`}>
                Royalty {policy.planType}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${policy.status === "ACTIVE" ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}`}>
                {policy.status}
              </span>
            </div>
            <p className="font-mono text-white/60 text-xs mb-5 mt-2">{policy.policyNumber}</p>

            <div className="text-3xl font-semibold mb-6">
              {formatCurrency(policy.premiumAmount)} <span className="text-lg font-normal text-white/70">/ {policy.paymentFrequency.toLowerCase()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/50 text-xs mb-1">Policy Type</p>
                <p className="font-medium">{policy.policyType}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1">Payment Method</p>
                <p className="font-medium">{policy.paymentMethod}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1">Start Date</p>
                <p className="font-medium">{formatDate(policy.inceptionDate)}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1">Renewal Date</p>
                <p className="font-medium">{formatDate(policy.renewalDate)}</p>
              </div>
            </div>

            {policy.arrearsAmount && policy.arrearsAmount > 0 && (
              <div className="mt-5 flex items-center gap-2 bg-red-500/20 border border-red-400/30 px-4 py-2 rounded-lg text-sm text-red-200">
                <AlertCircle size={16} />
                Arrears: {formatCurrency(policy.arrearsAmount)}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Dependents */}
      {dependentsList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users size={20} className="text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">Covered Dependents</h2>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
              {dependentsList.length} dependent{dependentsList.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {dependentsList.map(([key, dep]) => (
              <div key={key} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{dep.firstName} {dep.lastName}</p>
                  <p className="text-sm text-gray-500">{dep.relationship} • DOB: {formatDate(dep.dateOfBirth)}</p>
                </div>
                <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} /> Covered
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Payments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">Recent Payments</h2>
          </div>
          <a href="/portal/management" className="text-primary text-sm font-medium hover:underline">View all →</a>
        </div>
        {loadingPayments ? (
          <p className="text-gray-400 text-sm">Loading payments...</p>
        ) : recentPayments.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No payment records found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentPayments.map(([key, p]) => (
              <div key={key} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-900">{formatCurrency(p.amount)}</p>
                  <p className="text-gray-400 text-xs">{formatDate(p.date)} · {p.method}</p>
                </div>
                {p.reference && <span className="font-mono text-xs text-gray-500">{p.reference}</span>}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
