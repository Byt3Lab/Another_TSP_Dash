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

export const fetchFuelings = async () => {
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const fuelingSubscriptionsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_FUEL_SUBSCRIPTIONS_COLLECTION_NAME}`
  );
  const getDriversFuelingsByCreatedAtQuery = query(
    fuelingSubscriptionsDataRef,
    orderBy("created_at", "desc")
  );
  try {
    const fuelingsData = await getDocs(getDriversFuelingsByCreatedAtQuery).then(
      async (querySnapshot) => {
        const fuelings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        for (let x = 0; x < fuelings.length; x++) {
          if (
            fuelings[x].UID !== null &&
            fuelings[x].UID !== undefined &&
            fuelings[x].UID !== ""
          ) {
            let docRef = doc(
              db,
              process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
              fuelings[x].UID._key.path.segments[6]
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
            fuelings[x].userBaseData = userBaseData;
            fuelings[x].userCredsData = userCredsData;
          } else {
            fuelings[x].userBaseData = null;
            fuelings[x].userCredsData = null;
          }
        }

        return fuelings;
      }
    );

    // console.log("VALIDATED fuelings -> ", fuelingsData);
    return fuelingsData;
  } catch (error) {
    // console.log("Error getting validated documents: ", error);
    return [];
  }
};
