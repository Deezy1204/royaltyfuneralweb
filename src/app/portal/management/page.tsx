"use client";

import { motion } from "framer-motion";
import { Plus, UserMinus } from "lucide-react";

export default function PolicyManagement() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-primary-dark mb-2">Policy Management</h1>
        <p className="text-text-muted">Update your coverage level or manage your covered dependents.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
      >
        <h2 className="font-serif text-2xl text-primary-dark mb-6">Manage Dependents</h2>
        <p className="text-sm text-gray-500 mb-6">You currently have 3 dependents listed on your Family Premium plan. You can add up to 3 more.</p>
        
        <div className="space-y-4 mb-8">
          {[
            { id: 1, name: "Jane Doe", relation: "Spouse", dob: "1982-05-14" },
            { id: 2, name: "Michael Doe", relation: "Child", dob: "2010-08-22" },
            { id: 3, name: "Sarah Doe", relation: "Child", dob: "2013-11-05" }
          ].map((dep) => (
            <div key={dep.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50 group hover:shadow-sm transition-shadow">
              <div>
                <p className="font-medium text-gray-900">{dep.name}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span>Relationship: {dep.relation}</span>
                  <span>DOB: {dep.dob}</span>
                </div>
              </div>
              <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 focus:opacity-100">
                <UserMinus size={16} /> <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          ))}
        </div>

        <button className="w-full border-2 border-dashed border-primary/30 text-primary p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors font-medium">
          <Plus size={18} /> Add New Dependent
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200"
      >
        <h2 className="font-serif text-2xl text-primary-dark mb-6">Upgrade Coverage</h2>
        <div className="p-6 border border-primary/20 bg-primary/5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-semibold text-lg text-primary-dark mb-1">Extended Family Plan</h3>
            <p className="text-sm text-gray-600 mb-3">Upgrade to our premium plan to cover up to 10 dependents, including parents and in-laws.</p>
            <p className="text-primary font-bold">+$25.00 <span className="font-normal text-sm text-gray-500">/ month addition</span></p>
          </div>
          <button className="whitespace-nowrap bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all w-full md:w-auto shadow-md hover:shadow-lg">
            Compare & Upgrade
          </button>
        </div>
      </motion.div>

    </div>
  );
}
