"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, ShieldPlus, ChevronDown } from "lucide-react";

// --- Data Models ---
type PlanCategory = "Single life" | "Family";

interface PlanOption {
  name: string;
  basePrice: number;
}

interface PlanDetail {
  id: string;
  name: string;
  color: string;
  singleLife: PlanOption[];
  singleDependentPrice: number;
  family: PlanOption[];
  familyDependentPrice: number;
}

const plans: PlanDetail[] = [
  {
    id: "white",
    name: "Royalty White",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    singleLife: [{ name: "Single life (1 person)", basePrice: 6 }],
    singleDependentPrice: 3,
    family: [{ name: "Family (5 people)", basePrice: 10 }],
    familyDependentPrice: 3,
  },
  {
    id: "gold",
    name: "Royalty Gold",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    singleLife: [{ name: "Single life (1 person)", basePrice: 8 }],
    singleDependentPrice: 4,
    family: [
      { name: "Family (5 people)", basePrice: 12 },
      { name: "Royalty 10 (10 people)", basePrice: 20 },
      { name: "Royalty 12 (12 people)", basePrice: 25 },
    ],
    familyDependentPrice: 4,
  },
  {
    id: "blue",
    name: "Royalty Blue",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    singleLife: [{ name: "Single life (1 person)", basePrice: 12 }],
    singleDependentPrice: 5,
    family: [
      { name: "Family (5 people)", basePrice: 15 },
      { name: "Group", basePrice: 20 },
    ],
    familyDependentPrice: 5,
  },
  {
    id: "purple",
    name: "Royalty Purple",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    singleLife: [{ name: "Single life (1 person)", basePrice: 15 }],
    singleDependentPrice: 6,
    family: [{ name: "Family (5 people)", basePrice: 20 }],
    familyDependentPrice: 6,
  },
];

const accidentalDeathOptions = [
  { label: "None", price: 0 },
  { label: "$750 Benefit", price: 5 },
  { label: "$1500 Benefit", price: 7.5 },
  { label: "$2000 Benefit", price: 10 },
];

const spousalDeathOptions = [
  { label: "None", price: 0 },
  { label: "$300 Benefit", price: 5 },
  { label: "$600 Benefit", price: 10 },
];


export default function Policies() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("white");
  const [selectedCategory, setSelectedCategory] = useState<PlanCategory>("Single life");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(0);
  const [accidentalOption, setAccidentalOption] = useState<number>(0);
  const [spousalOption, setSpousalOption] = useState<number>(0);

  // --- Calculations ---
  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const activeOptions = selectedCategory === "Single life" ? activePlan.singleLife : activePlan.family;

  // Guard against varying array lengths if they switch categories
  const safeOptionIndex = selectedOptionIndex < activeOptions.length ? selectedOptionIndex : 0;
  const basePrice = activeOptions[safeOptionIndex].basePrice;
  const dependentPrice = selectedCategory === "Single life" ? activePlan.singleDependentPrice : activePlan.familyDependentPrice;

  const totalDependentsCost = dependents * dependentPrice;
  const accidentalCost = accidentalDeathOptions[accidentalOption].price;
  const spousalCost = spousalDeathOptions[spousalOption].price;

  const totalPremium = basePrice + totalDependentsCost + accidentalCost + spousalCost;

  // --- Handlers ---
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlanId(e.target.value);
    setSelectedOptionIndex(0); // Reset secondary option
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as PlanCategory);
    setSelectedOptionIndex(0); // Reset secondary option
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-cream">

      {/* Header */}
      <section className="bg-primary-dark text-white py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Funeral Policy Options
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-white/80 text-xl font-light"
          >
            Secure your family's future and relieve them of financial burdens with our straightforward, comprehensive coverage plans in the policy options.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column: Plan Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-12"
          >
            <div className="mb-10">
              <h2 className="font-serif text-4xl text-primary-dark mb-4">Our Packages</h2>
              <p className="text-text-muted text-lg">We offer four distinct plans to ensure you find the perfect coverage for your needs. Every plan comes with our signature compassionate care.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`p-6 border rounded-2xl ${plan.color} shadow-sm`}>
                  <h3 className="font-serif text-2xl mb-4 font-medium">{plan.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-1 border-b border-current pb-1 opacity-80">Single Life</p>
                      <ul className="space-y-1 text-sm">
                        {plan.singleLife.map(opt => <li key={opt.name}>{opt.name}: ${opt.basePrice}/mo</li>)}
                        <li>Dependent: ${plan.singleDependentPrice}/mo</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 border-b border-current pb-1 opacity-80">Family</p>
                      <ul className="space-y-1 text-sm">
                        {plan.family.map(opt => <li key={opt.name}>{opt.name}: ${opt.basePrice}/mo</li>)}
                        <li>Dependent: ${plan.familyDependentPrice}/mo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm mt-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldPlus className="text-primary" size={28} />
                <h3 className="font-serif text-3xl text-primary-dark">Optional Benefits</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg text-primary mb-2">Accidental Death Benefit (Lump-sum)</h4>
                  <ul className="space-y-2 text-text-muted">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> $750 benefit for $5/month</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> $1500 benefit for $7.50/month</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> $2000 benefit for $10/month</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-lg text-primary mb-2">Spousal/Principal Member Death Benefit</h4>
                  <ul className="space-y-2 text-text-muted">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> $300 benefit for $5/month</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> $600 benefit for $10/month</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-primary/10">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calculator size={24} />
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-primary-dark">Premium Calculator</h2>
                  <p className="text-text-muted text-sm">Estimate your monthly payment instantly</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-2">Select Package</label>
                  <div className="relative">
                    <select
                      value={selectedPlanId}
                      onChange={handlePlanChange}
                      className="w-full appearance-none bg-background-cream border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-2">Coverage Type</label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full appearance-none bg-background-cream border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="Single life">Single Life</option>
                        <option value="Family">Family</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  {/* Specific Option Selection */}
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-2">Specific Option</label>
                    <div className="relative">
                      <select
                        value={safeOptionIndex}
                        onChange={(e) => setSelectedOptionIndex(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        {activeOptions.map((opt, idx) => (
                          <option key={opt.name} value={idx}>{opt.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Dependents */}
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-2 flex justify-between">
                    <span>Number of Additional Dependents</span>
                    <span className="text-primary">${dependentPrice}/each</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setDependents(Math.max(0, dependents - 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-medium transition-colors"
                    >-</button>
                    <span className="w-12 text-center text-xl font-medium">{dependents}</span>
                    <button
                      onClick={() => setDependents(dependents + 1)}
                      className="w-12 h-12 rounded-xl bg-primary text-white hover:bg-primary-dark flex items-center justify-center text-xl font-medium transition-colors"
                    >+</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="font-medium text-primary-dark border-b pb-2">Optional Benefits</h3>

                  {/* Accidental Death */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Accidental Death Benefit</label>
                    <div className="relative">
                      <select
                        value={accidentalOption}
                        onChange={(e) => setAccidentalOption(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        {accidentalDeathOptions.map((opt, idx) => (
                          <option key={idx} value={idx}>
                            {opt.label} {opt.price > 0 ? `(+$${opt.price}/mo)` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  {/* Spousal Death */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Spousal/Principal Member Death</label>
                    <div className="relative">
                      <select
                        value={spousalOption}
                        onChange={(e) => setSpousalOption(Number(e.target.value))}
                        className="w-full appearance-none bg-background-cream border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        {spousalDeathOptions.map((opt, idx) => (
                          <option key={idx} value={idx}>
                            {opt.label} {opt.price > 0 ? `(+$${opt.price}/mo)` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-8 p-6 bg-primary-dark text-white rounded-2xl flex items-end justify-between shadow-inner">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Estimated Total</p>
                    <p className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
                      ${totalPremium.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-white/80 mb-2">/ month</span>
                </div>

                <p className="text-xs text-center text-gray-400 mt-4">
                  *This is an estimate. Final premiums are subject to underwriting and terms & conditions.
                </p>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
