import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export const addDriver = async (driver) => {
  const driversApplicationsDataRef = collection(
    db,
    `${process.env.REACT_APP_DRIVERS_APPLICATIONS_COLLECTION_NAME}`
  );
  let applicationPayload = {
    address: driver.address,
    driverPermitNumber: driver.driverPermitNumber,
    name: driver.name,
    forename: driver.forename,
    phone: driver.phone,
    state: driver.state,
    supplementBrand: driver.supplementBrand,
    supplementCommission: driver.supplementCommission,
    supplementDriverStatus: driver.supplementDriverStatus,
    supplementLicencePlate: driver.supplementLicencePlate,
    supplementModel: driver.supplementModel,
    supplementWorkTime: driver.supplementWorkTime,
    mail: driver.mail,
    UID: driver.UID,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  };

  try {
    const applicationDocRef = await addDoc(
      driversApplicationsDataRef,
      applicationPayload
    );
    if (applicationDocRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR IN ADDING DRIVER", error);
    return false;
  }
};
