import { ref, query as rtdbQuery, orderByChild, equalTo, get, DataSnapshot } from "firebase/database";
import { db } from "./firebase";

/**
 * Safely fetches data from a collection filtered by clientId.
 * Falls back to client-side filtering if the Firebase index is not defined.
 */
export async function safeFetchByClientId(path: string, clientId: string): Promise<DataSnapshot | { exists: () => boolean; val: () => any }> {
  const collectionRef = ref(db, path);
  
  try {
    // Attempt indexed query
    const q = rtdbQuery(collectionRef, orderByChild("clientId"), equalTo(clientId));
    const snap = await get(q);
    return snap;
  } catch (err: any) {
    if (err.message?.includes("Index not defined")) {
      console.warn(`Firebase Index not defined for ${path}. Falling back to client-side filter.`);
      const allSnap = await get(collectionRef);
      if (allSnap.exists()) {
        const allData = allSnap.val();
        const filteredData: Record<string, any> = {};
        
        Object.keys(allData).forEach(key => {
          if (allData[key].clientId === clientId) {
            filteredData[key] = allData[key];
          }
        });
        
        return {
          exists: () => Object.keys(filteredData).length > 0,
          val: () => filteredData
        };
      }
      return { exists: () => false, val: () => null };
    }
    throw err;
  }
}

/**
 * Fetches all plan data (plans and optional benefits) from the Realtime Database "plans" node.
 */
export async function getPlanData() {
  try {
    const plansRef = ref(db, "plans");
    const snapshot = await get(plansRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      const planKeys = ["BASIC", "BRONZE", "SILVER", "GOLD", "WHITE", "BLUE", "PURPLE"];
      const colors: Record<string, string> = {
        WHITE: "bg-slate-50 border-slate-200 text-slate-800 accent-slate-500 hover:bg-white",
        BASIC: "bg-slate-50 border-slate-200 text-slate-800 accent-slate-500 hover:bg-white",
        BLUE: "bg-blue-50 border-blue-200 text-blue-900 accent-blue-600 hover:bg-blue-100/50",
        BRONZE: "bg-[#FDF5F2] border-[#CD7F32] text-[#3E1F11] accent-[#CD7F32] shadow-[#CD7F32]/5 hover:bg-[#FDF5F2]/80",
        GOLD: "bg-[#FFF9E6] border-[#FFD700] text-[#4A3B00] accent-[#FFD700] shadow-[#FFD700]/10 hover:bg-[#FFF9E6]/80",
        SILVER: "bg-slate-50 border-slate-200 text-slate-800 accent-slate-500 hover:bg-white",
        PURPLE: "bg-purple-50 border-purple-200 text-purple-900 accent-purple-600 hover:bg-purple-100/50"
      };

      const plans = planKeys
        .filter(key => data[key])
        .map((key, index) => {
          const plan = data[key];
          return {
            ...plan,
            id: key,
            order: index,
            color: colors[key] || "bg-white",
            // If it has ageTiers (new structure), use it. Otherwise, map old options.
            ageTiers: plan.ageTiers || [],
            benefits: plan.benefits || [],
            cashBenefit: plan.cashBenefit || 0,
            dependentPremium: plan.dependentPremium || 0,
            // Keep old properties for compatibility if necessary
            singleLife: plan.options?.filter((opt: any) => opt.name.toLowerCase().includes("single")),
            family: plan.options?.filter((opt: any) => !opt.name.toLowerCase().includes("single")),
          };
        });
      
      const optionalBenefits = data["OPTIONAL_BENEFITS"] || {};
      
      return { plans, optionalBenefits };
    }
    
    return { plans: [], optionalBenefits: {} };
  } catch (error) {
    console.error("Error fetching plan data from Realtime Database:", error);
    throw error;
  }
}

/**
 * Compatibility wrapper for getPlans
 */
export async function getPlans() {
  const { plans } = await getPlanData();
  return plans;
}
