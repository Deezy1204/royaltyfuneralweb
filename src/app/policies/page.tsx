"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, CheckCircle2, ShieldPlus, ChevronDown, 
  Loader2, ShieldCheck, ArrowRight, Phone
} from "lucide-react";
import { getPlanData } from "@/lib/firebase-utils";

// --- Data Models ---
type PlanCategory = "Single life" | "Family";

export default function Policies() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [accidentalOption, setAccidentalOption] = useState(0);
  const [spousalOption, setSpousalOption] = useState(0);

  // Dynamic benefits from RTDB
  const [accidentalDeathOptions, setAccidentalDeathOptions] = useState<any[]>([{ id: 'none', label: 'None', premium: 0 }]);
  const [spousalDeathOptions, setSpousalDeathOptions] = useState<any[]>([{ id: 'none', label: 'None', premium: 0 }]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const { plans: plansData, optionalBenefits } = await getPlanData();
        setPlans(plansData);
        if (plansData.length > 0) {
          setSelectedPlanId(plansData[0].id);
        }

        if (optionalBenefits.ACCIDENTAL_DEATH) {
          setAccidentalDeathOptions([
            { id: 'none', label: 'None', premium: 0 },
            ...optionalBenefits.ACCIDENTAL_DEATH.map((opt: any) => ({
              ...opt,
              label: `$${opt.cover} Benefit`
            }))
          ]);
        }
        if (optionalBenefits.SPOUSAL_DEATH) {
          setSpousalDeathOptions([
            { id: 'none', label: 'None', premium: 0 },
            ...optionalBenefits.SPOUSAL_DEATH.map((opt: any) => ({
              ...opt,
              label: `$${opt.cover} Benefit`
            }))
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch plan data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  // --- Calculations ---
  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  if (loading || !activePlan) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background-cream">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="mt-4 text-primary-dark font-medium">Loading packages...</p>
      </div>
    );
  }

  const activeOptions = activePlan?.options || [];
  
  // Guard against varying array lengths
  const safeOptionIndex = (activeOptions.length > 0 && selectedOptionIndex < activeOptions.length) ? selectedOptionIndex : 0;
  const basePrice = activeOptions[safeOptionIndex]?.premium || 0;
  const dependentPrice = activePlan?.dependentPremium || 0;

  const totalDependentsCost = dependents * dependentPrice;
  const accidentalCost = accidentalDeathOptions[accidentalOption]?.premium || 0;
  const spousalCost = spousalDeathOptions[spousalOption]?.premium || 0;

  const totalPremium = basePrice + totalDependentsCost + accidentalCost + spousalCost;

  // --- Handlers ---
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlanId(e.target.value);
    setSelectedOptionIndex(0); // Reset secondary option
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-cream">

      {/* Header */}
      <section className="bg-primary-dark text-white py-14 md:py-20 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl mb-4"
          >
            Policy Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg font-light"
          >
            Comprehensive and simple funeral cover solutions for you and your loved ones.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Column: Plan Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-3xl text-primary-dark mb-2">Our Pricing</h2>
              <p className="text-text-muted text-base uppercase tracking-wider font-bold opacity-60">Slick & Transparent Coverage</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`p-5 rounded-3xl border-2 ${plan.color} shadow-lg transition-all hover:shadow-xl relative overflow-hidden flex flex-col h-full group`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold mb-0.5">{plan.name}</h3>
                      <div className="flex items-center gap-1.5 opacity-60">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Comprehensive</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-1 mb-4">
                    {(plan.options || []).map((opt: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-current/10">
                        <span className="text-sm font-medium">{opt.name}</span>
                        <div className="text-right">
                          <span className="text-xl font-bold font-serif">${opt.premium}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-current/20 mt-auto">
                    <div className="flex justify-between items-center bg-white/30 p-3 rounded-2xl border border-current/10 shadow-sm">
                      <div>
                        <span className="text-[9px] uppercase font-bold opacity-60 block">Additional Dependent</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold font-serif">${plan.dependentPremium}</span>
                        <span className="text-[10px] opacity-60 ml-0.5">/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldPlus className="text-primary" size={24} />
                <h3 className="font-serif text-2xl text-primary-dark">Optional Benefits</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary mb-2">Accidental Death Benefit (Lump-sum)</h4>
                  <ul className="space-y-2">
                    {accidentalDeathOptions.filter(o => o.id !== 'none').map((opt: any) => (
                      <li key={opt.id} className="flex items-center justify-between p-2 rounded-xl bg-background-cream/50 border border-primary/5 text-xs">
                        <span className="text-gray-700 font-medium">${opt.cover} Benefit</span>
                        <span className="font-bold text-primary">${opt.premium}/mo</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary mb-2">Spousal/Principal Member Death Benefit</h4>
                  <ul className="space-y-2">
                    {spousalDeathOptions.filter(o => o.id !== 'none').map((opt: any) => (
                      <li key={opt.id} className="flex items-center justify-between p-2 rounded-xl bg-background-cream/50 border border-primary/5 text-xs">
                        <span className="text-gray-700 font-medium">${opt.cover} Benefit</span>
                        <span className="font-bold text-primary">${opt.premium}/mo</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-primary/10 relative overflow-hidden max-w-lg mx-auto lg:mx-0">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calculator size={80} />
              </div>

              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner shrink-0">
                  <Calculator size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-primary-dark">Price Estimator</h2>
                  <p className="text-text-muted text-[10px] sm:text-xs">Find your monthly premium</p>
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                {/* Selection */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 opacity-70">Package</label>
                    <div className="relative">
                      <select
                        value={selectedPlanId}
                        onChange={handlePlanChange}
                        className="w-full appearance-none bg-background-cream border border-primary/10 text-gray-800 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium text-sm"
                      >
                        {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 opacity-70">Category</label>
                    <div className="relative">
                      <select
                        value={safeOptionIndex}
                        onChange={(e) => setSelectedOptionIndex(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-primary/10 text-gray-800 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium text-sm"
                      >
                        {activeOptions.map((opt: any, idx: number) => (
                          <option key={opt.id || idx} value={idx}>{opt.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>

                {/* Dependents */}
                <div className="p-4 bg-background-cream/50 rounded-2xl border border-primary/5">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-3 flex justify-between items-center gap-2">
                    <span className="shrink-0">Additional Dependents</span>
                    <span className="text-primary-dark opacity-60 text-[11px] font-bold whitespace-nowrap">${dependentPrice}/Mo</span>
                  </label>
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <button
                      onClick={() => setDependents(Math.max(0, dependents - 1))}
                      className="w-10 h-10 rounded-xl bg-white border border-primary/10 shadow-sm hover:bg-gray-50 flex items-center justify-center text-lg text-primary transition-all shrink-0"
                    >-</button>
                    <span className="w-8 text-center text-2xl font-serif font-bold text-primary-dark">{dependents}</span>
                    <button
                      onClick={() => setDependents(dependents + 1)}
                      className="w-10 h-10 rounded-xl bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark flex items-center justify-center text-lg transition-all shrink-0"
                    >+</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-4">
                  {/* Accidental Death */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 opacity-70">Accidental Death Benefit (Lump-sum)</label>
                    <div className="relative">
                      <select
                        value={accidentalOption}
                        onChange={(e) => setAccidentalOption(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-primary/10 text-gray-800 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium text-xs"
                      >
                        {accidentalDeathOptions.map((opt, idx) => (
                          <option key={idx} value={idx}>
                            {opt.label} {opt.premium > 0 ? `(+$${opt.premium}/mo)` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={14} />
                    </div>
                  </div>

                  {/* Spousal Death */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 opacity-70">Spousal/Principal Member Death Benefit</label>
                    <div className="relative">
                      <select
                        value={spousalOption}
                        onChange={(e) => setSpousalOption(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-primary/10 text-gray-800 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium text-xs"
                      >
                        {spousalDeathOptions.map((opt, idx) => (
                          <option key={idx} value={idx}>
                            {opt.label} {opt.premium > 0 ? `(+$${opt.premium}/mo)` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 p-4 sm:p-5 bg-primary-dark text-white rounded-2xl sm:rounded-3xl flex flex-col min-[380px]:flex-row items-center justify-between shadow-xl relative overflow-hidden gap-4 text-center min-[380px]:text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -mr-12 -mt-12" />
                  <div className="relative z-10">
                    <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold mb-0.5">Estimated Premium</p>
                    <div className="flex items-baseline gap-1 justify-center min-[380px]:justify-start">
                      <span className="text-2xl sm:text-3xl font-serif font-bold">${totalPremium.toFixed(2)}</span>
                      <span className="text-white/50 text-[10px]">/mo</span>
                    </div>
                  </div>
                  <div className="relative z-10 shrink-0">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <p className="text-[8px] uppercase font-bold text-primary-light">Guaranteed Rate</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-[9px] text-center text-gray-400 mt-2 italic px-4">
                  *Based on selections, subject to T&Cs.
                </p>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
