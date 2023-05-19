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

export const fetchDriversApplications = async () => {
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const driversApplicationsDataRef = collection(
    db,
    `${process.env.REACT_APP_DRIVERS_APPLICATIONS_COLLECTION_NAME}`
  );
  const getDriversApplicationsByCreatedAtQuery = query(
    driversApplicationsDataRef,
    where("state", "==", false),
    orderBy("created_at", "desc")
  );
  try {
    const applicationsData = await getDocs(
      getDriversApplicationsByCreatedAtQuery
    ).then(async (querySnapshot) => {
      const applications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      for (let x = 0; x < applications.length; x++) {
        let docRef = doc(
          db,
          process.env.REACT_APP_USERS_BASE_COLLECTION_NAME,
          applications[x].UID._key.path.segments[6]
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
        applications[x].userBaseData = userBaseData;
        applications[x].userCredsData = userCredsData;
      }

      return applications;
    });

    // console.log("APPLICATIONS -> ", applicationsData);
    return applicationsData;
  } catch (error) {
    // console.log("Error getting documents: ", error);
    return [];
  }
};
