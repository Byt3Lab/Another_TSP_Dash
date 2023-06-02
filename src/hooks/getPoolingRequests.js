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

export const fetchPoolingRequests = async () => {
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const usersCarBookingDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CAR_BOOKING_COLLECTION_NAME}`
  );
  const getUsersBookingsByCreatedAtQuery = query(
    usersCarBookingDataRef,
    orderBy("updated_at", "desc")
  );
  try {
    const poolingsData = await getDocs(getUsersBookingsByCreatedAtQuery).then(
      async (querySnapshot) => {
        const poolings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        for (let x = 0; x < poolings.length; x++) {
          let docRef = doc(
            db,
            process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
            poolings[x].UID._key.path.segments[6]
          );
          let approvedByDocRef;
          if (
            poolings[x].approvedByUID !== null &&
            poolings[x].approvedByUID !== undefined
          ) {
            approvedByDocRef = doc(
              db,
              process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
              poolings[x].approvedByUID._key.path.segments[6]
            );
          }
          let baseDataRef;
          let approvedByRef;
          let approvedByBaseData = null;
          let approvedByCredsData = null;
          const userBaseData = await getDoc(docRef).then((querySnapshot) => {
            baseDataRef = querySnapshot.ref;
            const user = {
              id: querySnapshot.id,
              ...querySnapshot.data(),
            };
            return user;
          });

          if (
            poolings[x].approvedByUID !== null &&
            poolings[x].approvedByUID !== undefined
          ) {
            approvedByBaseData = await getDoc(approvedByDocRef).then(
              (querySnapshot) => {
                approvedByRef = querySnapshot.ref;
                const user = {
                  id: querySnapshot.id,
                  ...querySnapshot.data(),
                };
                return user;
              }
            );
          }
          const userCredsData = await getDocs(
            query(usersCredsDataRef, where("UID", "==", baseDataRef))
          ).then((querySnapshot) => {
            const userCreds = {
              id: querySnapshot.docs[0].id,
              ...querySnapshot.docs[0].data(),
            };
            return userCreds;
          });
          if (
            poolings[x].approvedByUID !== null &&
            poolings[x].approvedByUID !== undefined
          ) {
            approvedByCredsData = await getDocs(
              query(usersCredsDataRef, where("UID", "==", approvedByRef))
            ).then((querySnapshot) => {
              const userCreds = {
                id: querySnapshot.docs[0].id,
                ...querySnapshot.docs[0].data(),
              };
              return userCreds;
            });
          }

          poolings[x].userBaseData = userBaseData;
          poolings[x].userCredsData = userCredsData;
          poolings[x].approvedByBaseData = approvedByBaseData;
          poolings[x].approvedByCredsData = approvedByCredsData;
        }

        return poolings;
      }
    );

    ///console.log("POOLINGS REQS -> ", poolingsData);
    return poolingsData;
  } catch (error) {
    //console.log("Error getting documents: ", error);
    return [];
  }
};
