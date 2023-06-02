import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const addSubscription = async (subscription) => {
  const usersSubscriptionsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CAR_SUBSCRIPTIONS_COLLECTION_NAME}`
  );
  let subscriptionPayload = {
    ...subscription,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  };

  try {
    const subscriptionDocRef = await addDoc(
      usersSubscriptionsDataRef,
      subscriptionPayload
    );
    if (subscriptionDocRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log("ERROR IN ADDING SUBSCRIPTION", error);
    return false;
  }
};
