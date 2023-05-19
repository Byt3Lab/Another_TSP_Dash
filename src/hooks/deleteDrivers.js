import { doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const deleteDrivers = async (userIds) => {
  try {
    for (let x = 0; x < userIds.length; x++) {
      const driverApplicationRef = doc(
        db,
        process.env.REACT_APP_DRIVERS_APPLICATIONS_COLLECTION_NAME,
        userIds[x][0]
      );
      await deleteDoc(driverApplicationRef);
      if (userIds[x][1] !== undefined && userIds[x][1] !== null) {
        const userBaseRef = doc(
          db,
          process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
          userIds[x][1]
        );
        await updateDoc(userBaseRef, {
          isDriver: false,
          updated_at: serverTimestamp(),
        });
      } else {
        console.log("");
      }
    }
    //console.log("DELETION OF ", userIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
