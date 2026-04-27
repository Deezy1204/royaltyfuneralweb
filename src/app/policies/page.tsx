"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, CheckCircle2, ShieldPlus, ChevronDown, 
  Loader2, ShieldCheck, ArrowRight, Phone,
  Map, DollarSign, HeartHandshake
} from "lucide-react";
import Link from "next/link";
import { getPlanData } from "@/lib/firebase-utils";

// --- Data Models ---
type PlanCategory = "Single life" | "Family";

import { formatCurrency } from "@/lib/utils";

export default function Policies() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"USD" | "ZAR">("USD");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedOption, setSelectedOption] = useState("SINGLE");
  const [selectedAgeTierLabel, setSelectedAgeTierLabel] = useState("");
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
          const firstPlan = plansData[0];
          setSelectedPlanId(firstPlan.id);
          if (firstPlan.ageTiers && firstPlan.ageTiers.length > 0) {
            setSelectedAgeTierLabel(firstPlan.ageTiers[0].label);
          }
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

  const activeAgeTier = activePlan.ageTiers?.find((t: any) => t.label === selectedAgeTierLabel) || activePlan.ageTiers?.[0];
  const availableOptions = activeAgeTier?.options ? Object.keys(activeAgeTier.options).filter(k => activeAgeTier.options[k] > 0) : [];
  
  const basePrice = (activeAgeTier?.options && activeAgeTier.options[selectedOption]) || 0;
  const dependentPrice = (activeAgeTier?.dependents?.CHILD) || activePlan.dependentPrice || 0;

  const totalDependentsCost = dependents * dependentPrice;
  const accidentalCost = accidentalDeathOptions[accidentalOption]?.premium || 0;
  const spousalCost = spousalDeathOptions[spousalOption]?.premium || 0;

  const totalPremium = basePrice + totalDependentsCost + accidentalCost + spousalCost;

  // --- Handlers ---
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setSelectedPlanId(planId);
    const newPlan = plans.find(p => p.id === planId);
    if (newPlan?.ageTiers?.length > 0) {
      const hasSameTier = newPlan.ageTiers.some((t: any) => t.label === selectedAgeTierLabel);
      if (!hasSameTier) {
        setSelectedAgeTierLabel(newPlan.ageTiers[0].label);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-cream font-sans">

      {/* Header and Currency Switcher */}
      <section className="bg-white text-primary-dark py-16 md:py-24 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 block"
              >
                Policies & Options
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-5xl md:text-7xl mb-6 leading-tight text-primary-dark"
              >
                Comprehensive <br />
                Policy <span className="text-primary italic font-light">Suite</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-text-muted text-lg md:text-xl font-light leading-relaxed max-w-xl"
              >
                Choose from our range of expertly crafted policy packages designed to protect your family's future with dignity.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/5 backdrop-blur-xl border border-primary/10 p-1 rounded-lg flex items-center gap-1 shadow-sm"
            >
              {[
                { id: "USD", label: "USD", sub: "US Dollar" },
                { id: "ZAR", label: "ZAR", sub: "SA Rand" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCurrency(c.id as any)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 flex flex-col items-center min-w-[80px] ${
                    currency === c.id 
                    ? "bg-white text-primary-dark shadow-md" 
                    : "hover:bg-primary/10 text-primary/60"
                  }`}
                >
                  <span className="font-bold text-sm tracking-widest">{c.label}</span>
                  <span className={`text-[8px] font-medium opacity-50 ${currency === c.id ? "text-primary-dark" : "text-primary"}`}>{c.sub}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content - Policies Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 -mt-12">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col rounded-xl border-t-4 border-l border-r border-b border-primary/10 ${plan.color.replace('border-', 'border-t-')} bg-white p-6 shadow-xl transition-all duration-300 hover:border-primary/30 relative group`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-3xl font-bold leading-tight">{plan.name || plan.id}</h3>
                  <div className="p-2 bg-black/5 rounded-xl border border-black/5 group-hover:scale-110 transition-transform duration-500 text-current">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Elite Coverage</p>
              </div>

              {/* Benefits Section */}
              <div className="flex-grow space-y-4 mb-8">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 border-b border-current/10 pb-2">Full Policy Benefits</h4>
                {plan.benefits && plan.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {plan.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={12} className="text-current" />
                        </div>
                        <span className="text-xs font-medium leading-normal opacity-70">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs italic opacity-40">Comprehensive funeral benefits included.</p>
                )}
              </div>

              {/* Pricing Table */}
              <div className="bg-primary/5 rounded-lg p-5 border border-primary/10 mb-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary-dark opacity-60">Premiums by Option</h4>
                <div className="space-y-2">
                  {plan.ageTiers?.length > 0 && plan.ageTiers[0].options && (
                    <div className="space-y-1">
                      {Object.entries(plan.ageTiers[0].options).filter(([_, v]) => Number(v) > 0).map(([optName, optPrice]: any, j) => (
                        <div key={j} className="flex justify-between items-center py-1.5 border-b border-primary/5 last:border-0">
                          <span className="text-sm font-semibold uppercase tracking-widest text-primary-dark/70">{optName.replace('_', ' ')}</span>
                          <span className="text-base font-bold font-serif text-primary-dark">{formatCurrency(optPrice, currency)}/mo</span>
                        </div>
                      ))}
                      <div className="text-[10px] uppercase tracking-widest opacity-40 mt-3 italic text-primary-dark">* Prices for {plan.ageTiers[0].label} yrs age group</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-primary/10 mt-auto space-y-3">
                <div className="flex justify-between items-center bg-primary/5 p-4 rounded-lg border border-primary/5">
                  <div>
                    <span className="text-xs uppercase font-bold text-primary-dark/50 block">Cash Benefit</span>
                    <span className="text-2xl font-bold font-serif text-primary-dark">{formatCurrency(plan.cashBenefit || 0, currency)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-primary text-white py-3 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 group/btn shadow-lg shadow-primary/20"
                >
                  Select This Policy
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estimator Section */}
      <section id="estimator" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-primary-dark/[0.02] skew-y-3 transform origin-top-right" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                Custom Quote Tool
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary-dark mb-4">Calculate Your Policy</h2>
              <p className="text-text-muted text-lg font-light max-w-2xl mx-auto">Tailor your selection to your specific needs and see your guaranteed monthly premium instantly.</p>
            </div>

            <div className="bg-background-cream rounded-xl p-4 md:p-6 shadow-xl border border-primary/10 grid lg:grid-cols-12 gap-6 items-center">
              
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Package</label>
                    <div className="relative group">
                      <select 
                        value={selectedPlanId} 
                        onChange={handlePlanChange}
                        className="w-full appearance-none bg-white border border-primary/20 hover:border-primary/50 text-primary-dark py-3 px-4 rounded-md outline-none transition-all font-serif text-xl"
                      >
                        {plans.map(p => <option key={p.id} value={p.id}>{p.name || p.id}</option>)}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={20} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Age Group</label>
                    <div className="relative group">
                      <select 
                        value={selectedAgeTierLabel} 
                        onChange={(e) => setSelectedAgeTierLabel(e.target.value)}
                        className="w-full appearance-none bg-white border border-primary/20 hover:border-primary/50 text-primary-dark py-3 px-4 rounded-md outline-none transition-all font-serif text-xl"
                      >
                        {activePlan.ageTiers?.map((t: any) => (
                          <option key={t.label} value={t.label}>{t.label} Years</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Option</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableOptions.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`py-3 px-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
                          selectedOption === opt 
                          ? "bg-primary text-white shadow-md" 
                          : "bg-white border border-primary/20 text-primary-dark hover:border-primary/50"
                        }`}
                      >
                        {opt.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dependents</label>
                      <span className="text-primary-dark font-serif text-sm font-bold">+{formatCurrency(dependentPrice, currency)}/ea</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => setDependents(Math.max(0, dependents - 1))}
                        className="w-10 h-10 rounded-md border border-primary/20 text-primary hover:bg-background-cream"
                      >-</button>
                      <span className="text-4xl font-serif font-bold text-primary-dark">{dependents}</span>
                      <button 
                        onClick={() => setDependents(dependents + 1)}
                        className="w-10 h-10 rounded-md bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark"
                      >+</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Optional Lump Sum</label>
                       <select 
                          value={accidentalOption} 
                          onChange={(e) => setAccidentalOption(Number(e.target.value))}
                          className="w-full bg-white border border-primary/20 py-2.5 px-3 rounded-md text-sm outline-none hover:border-primary/40 focus:border-primary"
                        >
                          {accidentalDeathOptions.map((opt, idx) => (
                            <option key={idx} value={idx}>
                              {opt.label} {opt.premium > 0 ? `(+${formatCurrency(opt.premium, currency)})` : ''}
                            </option>
                           ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Spousal Benefit</label>
                       <select 
                          value={spousalOption} 
                          onChange={(e) => setSpousalOption(Number(e.target.value))}
                          className="w-full bg-white border border-primary/20 py-2.5 px-3 rounded-md text-sm outline-none hover:border-primary/40 focus:border-primary"
                        >
                          {spousalDeathOptions.map((opt, idx) => (
                            <option key={idx} value={idx}>
                              {opt.label} {opt.premium > 0 ? `(+${formatCurrency(opt.premium, currency)})` : ''}
                            </option>
                           ))}
                        </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Results */}
              <div className="lg:col-span-5 bg-white border border-primary/10 rounded-xl p-6 md:p-8 text-primary-dark relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="relative z-10">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-8 block">Policy Quote</span>
                  
                  <div className="space-y-6 mb-12 border-b border-primary/10 pb-12">
                     <div className="flex justify-between items-center text-text-muted text-sm font-light">
                        <span>Base Policy</span>
                        <span className="text-primary-dark font-serif text-lg">{formatCurrency(basePrice, currency)}</span>
                     </div>
                     {dependents > 0 && (
                        <div className="flex justify-between items-center text-text-muted text-sm font-light">
                          <span>Dependents</span>
                          <span className="text-primary-dark font-serif text-lg">+{formatCurrency(totalDependentsCost, currency)}</span>
                        </div>
                     )}
                     {(accidentalCost > 0 || spousalCost > 0) && (
                        <div className="flex justify-between items-center text-text-muted text-sm font-light">
                          <span>Add-ons</span>
                          <span className="text-primary-dark font-serif text-lg">+{formatCurrency(accidentalCost + spousalCost, currency)}</span>
                        </div>
                     )}
                  </div>

                  <div className="space-y-2 mb-12">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/40">Total Monthly Premium</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl md:text-6xl font-serif font-bold text-primary">{formatCurrency(totalPremium, currency)}</span>
                       <span className="text-text-muted/40 text-sm">/mo</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Link 
                      href={`/contact?plan=${activePlan.name || activePlan.id}&tier=${selectedAgeTierLabel}&dependents=${dependents}&total=${totalPremium}&currency=${currency}`}
                      className="bg-primary text-white py-4 rounded-md flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 group"
                    >
                      Secure Your Policy
                      <ShieldCheck size={16} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Benefits Reminder Section */}
      <section className="py-24 bg-background-cream text-primary-dark">
        <div className="container mx-auto px-4 md:px-8 text-center">
           <h3 className="font-serif text-4xl mb-12">Why Royalty Funeral?</h3>
           <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { icon: Map, title: "Repatriation", desc: "Burial anywhere within Zimbabwe borders at no extra cost." },
                { icon: DollarSign, title: "Cash-Back", desc: "Enjoy up to 30% cashback." },
                { icon: HeartHandshake, title: "No Age Limit", desc: "Inclusive coverage options for seniors up to 84 years." }
              ].map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 bg-white rounded-lg border border-primary/10 flex items-center justify-center mx-auto shadow-md text-primary">
                    <f.icon size={24} />
                  </div>
                  <h4 className="font-serif text-xl">{f.title}</h4>
                  <p className="text-sm text-text-muted font-light">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
