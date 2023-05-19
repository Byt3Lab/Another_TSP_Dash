import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../configs/firebase";

export const deleteDriversApplications = async (userIds) => {
  const usersBaseDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_BASE_COLLECTION_NAME}`
  );
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );

  try {
    for (let x = 0; x < userIds.length; x++) {
      const driverApplicationRef = doc(
        db,
        process.env.REACT_APP_DRIVERS_APPLICATIONS_COLLECTION_NAME,
        userIds[x][0]
      );
      const userBaseRef = doc(
        db,
        process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
        userIds[x][1]
      );
      await deleteDoc(driverApplicationRef);
      await updateDoc(userBaseRef, {
        isDriver: false,
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
