import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const deleteSubscriptions = async (subIds) => {
  try {
    for (let x = 0; x < subIds.length; x++) {
      const userSubscriptionRef = doc(
        db,
        process.env.REACT_APP_USERS_CAR_SUBSCRIPTIONS_COLLECTION_NAME,
        subIds[x][0]
      );
      await deleteDoc(userSubscriptionRef);
    }
    //console.log("DELETION OF ", subIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
