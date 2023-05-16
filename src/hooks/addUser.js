import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import {
  collection,
  addDoc,
  Timestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { storage } from "../configs/firebase";
import fernet from "fernet";
import { db } from "../configs/firebase";

const uploadProfilePic = async (profilePic, name, forename, UID) => {
  if (profilePic === "") return "";
  const refStr = `${forename.toString().toLowerCase()}_${name
    .toString()
    .toLowerCase()}[${UID}]/pictures/profile/${UID}_${new Date().getTime()}`;
  const storageRef = ref(storage, `${refStr}`);
  try {
    const downloadReq = await uploadString(storageRef, profilePic, "data_url");
    const downloadStr = await getDownloadURL(downloadReq.ref);
    return downloadStr;
  } catch (error) {
    console.log("ERROR IN UPLOADING IMAGE", error);
    return "";
  }
};

const encryptPassword = async (password) => {
  try {
    var token = new fernet.Token({
      secret: new fernet.Secret(process.env.REACT_APP_CRYPTKEY),
      ttl: 0,
    });
    const encPwd = token.encode(password);
    // console.log("ENCRYPTED PWD", encPwd, " FROM ", password);
    // console.log("DECRYPTED PWD", token.decode(encPwd));
    return encPwd;
  } catch (error) {
    return "";
  }
};

export const addUser = async (user) => {
  const password = await encryptPassword(user.password);
  const usersBaseDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_BASE_COLLECTION_NAME}`
  );
  const usersCredsDataRef = collection(
    db,
    `${process.env.REACT_APP_USERS_CREDS_COLLECTION_NAME}`
  );
  const userBasePayload = {
    name: user.name,
    forename: user.forename,
    profilePic: "",
    isDriver: user.isDriver,
    deviceToken: "",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  };
  let userCredsPayload = {
    phone: user.phone,
    mail: user.mail,
    password: password,
    isGoogleAuthEnabled: false,
    state: user.state,
    UID: "",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  };

  try {
    const baseDocRef = await addDoc(usersBaseDataRef, userBasePayload);
    const insertedRef = await getDoc(baseDocRef);
    userCredsPayload.UID = insertedRef.ref;
    const credsDocRef = await addDoc(usersCredsDataRef, userCredsPayload);
    const uploadImageResult = await uploadProfilePic(
      user.profilePic,
      user.name,
      user.forename,
      insertedRef.id
    );
    if (uploadImageResult) {
      await updateDoc(insertedRef.ref, {
        profilePic: uploadImageResult,
      });
    }
    return credsDocRef.id !== undefined && credsDocRef.id !== null;
  } catch (error) {
    //console.log("ERROR IN ADDING USER", error);
    return false;
  }
};
