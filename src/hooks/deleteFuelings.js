import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const deleteFuelings = async (fuelingIds) => {
  try {
    for (let x = 0; x < fuelingIds.length; x++) {
      const driversFuelingsRef = doc(
        db,
        process.env.REACT_APP_USERS_FUEL_SUBSCRIPTIONS_COLLECTION_NAME,
        fuelingIds[x][0]
      );
      await deleteDoc(driversFuelingsRef);
    }
    //console.log("DELETION OF ", fuelingIds.length, " FUEL SUB(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
