"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, query, orderByChild, equalTo, get, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, KeyRound, Eye, EyeOff, LogOut, User, FileText, CreditCard, FileCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// ---------- Types ----------
export interface ClientData {
  clientId: string;
  clientNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  title: string;
  isActive: boolean;
}

export interface PolicyData {
  policyId: string;
  policyNumber: string;
  clientId: string;
  planType: string;
  policyType: string;
  premiumAmount: number;
  coverAmount: number;
  status: string;
  paymentFrequency: string;
  paymentMethod: string;
  inceptionDate: string;
  renewalDate: string;
  effectiveDate: string;
  waitingPeriodEnd: string;
  lastPaymentDate?: string;
  arrearsAmount?: number;
  dependents?: Record<string, {
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    gender?: string;
    idNumber?: string;
  }>;
}

// ---------- Context ----------
interface PortalContextType {
  client: ClientData | null;
  policy: PolicyData | null;
  signOut: () => void;
}

const PortalContext = createContext<PortalContextType>({
  client: null,
  policy: null,
  signOut: () => { },
});

export const usePortal = () => useContext(PortalContext);

// ---------- Layout ----------
const navLinks = [
  { name: "My Account", href: "/portal", icon: User },
  { name: "My Documents", href: "/portal/management", icon: FileText },
  { name: "Make a Payment", href: "/portal/payment", icon: CreditCard },
];

function PortalSidebar({ client, policy, onSignOut }: { client: ClientData; policy: PolicyData; onSignOut: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 h-auto md:h-[calc(100vh-80px)] md:sticky md:top-[40px] flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-6">
          <h2 className="font-serif text-xl text-primary-dark mb-0.5">Client Portal</h2>
          <p className="text-sm text-text-muted">Welcome, {client.firstName}</p>
          <p className="text-xs text-gray-400 mt-1 font-mono">{policy.policyNumber}</p>
        </div>
        <nav className="space-y-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${pathname === href
                ? "bg-primary/5 text-primary"
                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 text-red-500 hover:text-red-700 transition-colors font-medium px-4 py-2 w-full text-left"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function LoginForm({ onSuccess }: { onSuccess: (client: ClientData, policy: PolicyData) => void }) {
  const [policyNumber, setPolicyNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Find policy by policyNumber
      const policiesRef = ref(db, "policies");
      let policySnap;

      try {
        const policyQuery = query(policiesRef, orderByChild("policyNumber"), equalTo(policyNumber.trim()));
        policySnap = await get(policyQuery);
      } catch (err: any) {
        // Fallback if index is not defined
        console.warn("Firebase Index error, falling back to client-side filter:", err.message);
        const allPoliciesSnap = await get(policiesRef);
        if (allPoliciesSnap.exists()) {
          const allData = allPoliciesSnap.val();
          const matchKey = Object.keys(allData).find(k => allData[k].policyNumber?.trim() === policyNumber.trim());
          if (matchKey) {
            // Mock a snapshot-like object for the logic below
            policySnap = {
              exists: () => true,
              val: () => ({ [matchKey]: allData[matchKey] })
            };
          }
        }
      }

      if (!policySnap || !policySnap.exists()) {
        setError("Policy number not found. Please check and try again.");
        setLoading(false);
        return;
      }

      // Get first matching policy
      const policyVal = policySnap.val();
      const policyKey = Object.keys(policyVal)[0];
      const policyData: PolicyData = { policyId: policyKey, ...policyVal[policyKey] };

      // 2. Get client data
      const clientSnap = await get(ref(db, `clients/${policyData.clientId}`));
      if (!clientSnap.exists()) {
        setError("Client record not found. Please contact support.");
        setLoading(false);
        return;
      }
      const clientData: ClientData = { clientId: policyData.clientId, ...clientSnap.val() };

      // 3. Check if user is setting PIN for the first time
      const pinRef = ref(db, `clientPins/${policyData.clientId}`);
      const pinSnap = await get(pinRef);

      if (!pinSnap.exists()) {
        if (!isNewUser) {
          setIsNewUser(true);
          setLoading(false);
          return;
        }

        // New user is submitting their PIN
        if (pin.length < 4) {
          setError("Please choose at least a 4-digit PIN.");
          setLoading(false);
          return;
        }
        if (pin !== confirmPin) {
          setError("PINs do not match. Please re-enter.");
          setLoading(false);
          return;
        }
        await set(pinRef, { pin: pin.trim() });
      } else {
        // Validate existing PIN
        if (pinSnap.val().pin !== pin.trim()) {
          setError("Incorrect PIN. Please try again.");
          setLoading(false);
          return;
        }
      }

      onSuccess(clientData, policyData);
    } catch (err) {
      console.error(err);
      setError("Unable to connect. Please check your connection and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-cream flex items-center justify-center p-4 pt-[40px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary-dark text-white p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="font-serif text-2xl mb-1">Client Portal</h1>
            <p className="text-white/70 text-sm">Sign in with your policy number and PIN</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Policy Number</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  placeholder="e.g. POL-20260224-0953"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {isNewUser ? "Choose PIN" : "PIN"}
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder={isNewUser ? "Set 4-digit PIN" : "Enter your PIN"}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isNewUser && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="block text-sm font-medium text-gray-700">Confirm PIN</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPin ? "text" : "password"}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      placeholder="Repeat your PIN"
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      required
                      minLength={4}
                    />
                  </div>
                  <p className="text-xs text-primary font-medium">Welcome! Since this is your first login, please set a PIN to secure your portal.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-lg mt-2"
            >
              {loading ? "Signing in..." : "Sign In to Portal"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Trouble signing in? <a href="/contact" className="text-primary hover:underline">Contact support</a>
        </p>
      </motion.div>
    </div>
  );
}

// ---------- Main Layout Export ----------
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<ClientData | null>(null);
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Restore session from sessionStorage
    try {
      const savedClient = sessionStorage.getItem("portal_client");
      const savedPolicy = sessionStorage.getItem("portal_policy");
      if (savedClient && savedPolicy) {
        setClient(JSON.parse(savedClient));
        setPolicy(JSON.parse(savedPolicy));
      }
    } catch { }
    setHydrated(true);
  }, []);

  const handleLoginSuccess = (c: ClientData, p: PolicyData) => {
    setClient(c);
    setPolicy(p);
    sessionStorage.setItem("portal_client", JSON.stringify(c));
    sessionStorage.setItem("portal_policy", JSON.stringify(p));
  };

  const handleSignOut = () => {
    setClient(null);
    setPolicy(null);
    sessionStorage.removeItem("portal_client");
    sessionStorage.removeItem("portal_policy");
  };

  if (!hydrated) return null;

  if (!client || !policy) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <PortalContext.Provider value={{ client, policy, signOut: handleSignOut }}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <PortalSidebar client={client} policy={policy} onSignOut={handleSignOut} />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PortalContext.Provider>
  );
}
