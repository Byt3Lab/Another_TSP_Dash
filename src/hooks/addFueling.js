import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const addFueling = async (fueling) => {
  const driversFuelingsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_FUEL_SUBSCRIPTIONS_COLLECTION_NAME}`
  );
  let fuelingPayload = {
    ...fueling,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  };

  try {
    const fuelingDocRef = await addDoc(driversFuelingsDataRef, fuelingPayload);
    if (fuelingDocRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR IN ADDING FUEL SUB", error);
    return false;
  }
};
