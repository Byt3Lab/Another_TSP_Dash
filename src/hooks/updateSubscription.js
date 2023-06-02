import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const updateSubscription = async (userIds) => {
  try {
    for (let x = 0; x < userIds.length; x++) {
      const usersSubscriptionsRef = doc(
        db,
        process.env.REACT_APP_USERS_CAR_SUBSCRIPTIONS_COLLECTION_NAME,
        userIds[x][0]
      );
      await updateDoc(usersSubscriptionsRef, {
        state: true,
        updated_at: serverTimestamp(),
      });
    }
    //console.log("DELETION OF ", userIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
