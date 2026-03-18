"use client";

import { motion } from "framer-motion";

export default function AccountDashboard() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-primary-dark mb-2">My Account Overview</h1>
        <p className="text-text-muted">Manage your personal details and view your active policies.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Profile Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-serif text-2xl text-primary-dark">Profile Details</h2>
            <button className="text-sm text-primary font-medium hover:underline">Edit</button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium col-span-1">Full Name</span>
              <span className="text-gray-900 col-span-2">John Doe</span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium col-span-1">Email ID</span>
              <span className="text-gray-900 col-span-2">john.doe@example.com</span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium col-span-1">Phone</span>
              <span className="text-gray-900 col-span-2">+263 772 123 456</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pb-1">
              <span className="text-gray-500 font-medium col-span-1">Address</span>
              <span className="text-gray-900 col-span-2">45 Samora Machel Ave, Bulawayo</span>
            </div>
          </div>
        </div>

        {/* Active Policy Summary */}
        <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-2xl mb-1">Family Premium</h2>
            <p className="text-white/70 text-sm mb-6">Policy #RFS-88492-23</p>
            
            <div className="space-y-1 mb-8">
              <div className="text-3xl font-semibold">$35.00 <span className="text-lg font-normal text-white/70">/ month</span></div>
              <p className="text-white/80 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Active • Next payment due: 1st Nov
              </p>
            </div>

            <div className="flex gap-4">
              <button className="bg-white text-primary px-5 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm shadow-sm">
                Pay Premium
              </button>
              <button className="bg-transparent border border-white/30 text-white px-5 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dependents Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl text-primary-dark">Covered Beneficiaries</h2>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">3 of 6 Slots Used</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { name: "Jane Doe", relation: "Spouse", age: 42 },
            { name: "Michael Doe", relation: "Child", age: 14 },
            { name: "Sarah Doe", relation: "Child", age: 11 }
          ].map((dep, i) => (
            <div key={i} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{dep.name}</p>
                <p className="text-sm text-gray-500">{dep.relation} • Age {dep.age}</p>
              </div>
              <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                Covered
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
