import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const deletePoolingRequests = async (requestIds) => {
  try {
    for (let x = 0; x < requestIds.length; x++) {
      const poolingRequestRef = doc(
        db,
        process.env.REACT_APP_USERS_CAR_BOOKING_COLLECTION_NAME,
        requestIds[x][0]
      );
      await deleteDoc(poolingRequestRef);
    }
    //console.log("DELETION OF ", requestIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    //console.log("AN ERROR OCCURED WHILE DELETING ", error);
    return false;
  }
};
