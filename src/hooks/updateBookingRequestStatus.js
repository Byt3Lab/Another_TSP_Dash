import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const updateBookingRequestStatus = async (bookingIds, value) => {
  try {
    for (let x = 0; x < bookingIds.length; x++) {
      const userBookingRef = doc(
        db,
        process.env.REACT_APP_USERS_CAR_BOOKING_COLLECTION_NAME,
        bookingIds[x][0]
      );
      await updateDoc(userBookingRef, {
        state: `${value}`,
        updated_at: serverTimestamp(),
      });
    }
    //console.log("DELETION OF ", userIds.length, " USER(S) SUCCESSFUL");
    return true;
  } catch (error) {
    return false;
  }
};
