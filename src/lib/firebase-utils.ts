import { ref, query, orderByChild, equalTo, get, DataSnapshot } from "firebase/database";
import { db } from "./firebase";

/**
 * Safely fetches data from a collection filtered by clientId.
 * Falls back to client-side filtering if the Firebase index is not defined.
 */
export async function safeFetchByClientId(path: string, clientId: string): Promise<DataSnapshot | { exists: () => boolean; val: () => any }> {
  const collectionRef = ref(db, path);
  
  try {
    // Attempt indexed query
    const q = query(collectionRef, orderByChild("clientId"), equalTo(clientId));
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
