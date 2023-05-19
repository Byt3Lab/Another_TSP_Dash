import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const deleteUsers = async (userIds) => {
  try {
    for (let x = 0; x < userIds.length; x++) {
      const userBaseRef = doc(
        db,
        process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
        userIds[x][0]
      );
      const userCredsRef = doc(
        db,
        process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME,
        userIds[x][1]
      );
      await deleteDoc(userBaseRef);
      await deleteDoc(userCredsRef);
    }
    //console.log("DELETION OF ", userIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
