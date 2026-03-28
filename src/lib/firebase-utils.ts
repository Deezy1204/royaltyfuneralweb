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
      
      const planKeys = ["WHITE", "BLUE", "GOLD", "PURPLE"];
      const colors: Record<string, string> = {
        WHITE: "bg-slate-50 border-slate-200 text-slate-800 accent-slate-500 hover:bg-white",
        BLUE: "bg-blue-50 border-blue-200 text-blue-900 accent-blue-600 hover:bg-blue-100/50",
        GOLD: "bg-amber-50 border-amber-300 text-amber-900 accent-amber-600 hover:bg-amber-100/50",
        PURPLE: "bg-purple-50 border-purple-200 text-purple-900 accent-purple-600 hover:bg-purple-100/50"
      };

      const plans = planKeys
        .filter(key => data[key])
        .map((key, index) => {
          const plan = data[key];
          // Map the user's structure to what the UI expects or a similar format
          return {
            ...plan,
            id: key,
            order: index,
            color: colors[key] || "bg-white",
            // Split options into singleLife and family for backward compatibility with UI
            singleLife: (plan.options || [])
              .filter((opt: any) => opt.name.toLowerCase().includes("single"))
              .map((opt: any) => ({ ...opt, basePrice: opt.premium })),
            family: (plan.options || [])
              .filter((opt: any) => !opt.name.toLowerCase().includes("single"))
              .map((opt: any) => ({ ...opt, basePrice: opt.premium })),
            singleDependentPrice: plan.dependentPremium || 0,
            familyDependentPrice: plan.dependentPremium || 0,
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
