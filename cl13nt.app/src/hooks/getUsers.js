import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../configs/firebase";

export const fetchUsers = async () => {
  const usersBaseDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_BASE_COLLECTION_NAME}`
  );
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const getBaseByCreatedAtQuery = query(
    usersBaseDataRef,
    orderBy("created_at", "desc")
  );
  const getCredsByCreatedAtQuery = query(
    usersCredsDataRef,
    orderBy("created_at", "desc")
  );
  const usersData = await getDocs(getBaseByCreatedAtQuery)
    .then(async (querySnapshot) => {
      const baseData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return baseData;
    })
    .then(async (baseData) => {
      const credsData = await getDocs(getCredsByCreatedAtQuery).then(
        async (querySnapshot) => {
          const tempCredsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          return tempCredsData;
        }
      );
      for (let x = 0; x < baseData.length; x++) {
        baseData[x] = { ...baseData[x], ...credsData[x] };
      }

      return baseData;
    });
  console.log("2nd THEN", usersData);
  return usersData;
};
