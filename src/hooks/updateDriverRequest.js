import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const updateDriverRequest = async (userIds) => {
  try {
    for (let x = 0; x < userIds.length; x++) {
      const userBaseRef = doc(
        db,
        process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
        userIds[x][1]
      );
      const driversApplicationsRef = doc(
        db,
        process.env.REACT_APP_DRIVERS_APPLICATIONS_COLLECTION_NAME,
        userIds[x][0]
      );
      await updateDoc(driversApplicationsRef, {
        state: true,
        updated_at: serverTimestamp(),
      });
      await updateDoc(userBaseRef, {
        isDriver: true,
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
