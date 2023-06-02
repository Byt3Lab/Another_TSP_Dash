import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../configs/firebase";

export const fetchSubscriptions = async () => {
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const usersSubscriptionsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CAR_SUBSCRIPTIONS_COLLECTION_NAME}`
  );
  const getUsersSubscriptionsByCreatedAtQuery = query(
    usersSubscriptionsDataRef,
    orderBy("created_at", "desc")
  );
  try {
    const subscriptionsData = await getDocs(
      getUsersSubscriptionsByCreatedAtQuery
    ).then(async (querySnapshot) => {
      const subs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      for (let x = 0; x < subs.length; x++) {
        if (
          subs[x].UID !== null &&
          subs[x].UID !== undefined &&
          subs[x].UID !== ""
        ) {
          let docRef = doc(
            db,
            process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
            subs[x].UID._key.path.segments[6]
          );
          let baseDataRef;
          const userBaseData = await getDoc(docRef).then((querySnapshot) => {
            baseDataRef = querySnapshot.ref;
            const user = {
              id: querySnapshot.id,
              ...querySnapshot.data(),
            };
            return user;
          });
          const userCredsData = await getDocs(
            query(usersCredsDataRef, where("UID", "==", baseDataRef))
          ).then((querySnapshot) => {
            const userCreds = {
              id: querySnapshot.docs[0].id,
              ...querySnapshot.docs[0].data(),
            };
            return userCreds;
          });
          subs[x].userBaseData = userBaseData;
          subs[x].userCredsData = userCredsData;
        } else {
          subs[x].userBaseData = null;
          subs[x].userCredsData = null;
        }
      }

      return subs;
    });

    // console.log("VALIDATED APPLICATIONS -> ", applicationsData);
    return subscriptionsData;
  } catch (error) {
    // console.log("Error getting validated documents: ", error);
    return [];
  }
};
