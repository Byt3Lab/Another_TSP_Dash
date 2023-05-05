import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useState, useEffect } from "react";

const GetDrivers = () => {
    const [drivers, setDrivers] = useState([])
    useEffect(() => {
        const getData = async () => {
            await getDocs(collection(firestore, "drivers_applications"))
                .then((querySnapshot)=>{
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));
                    setDrivers(newData);
                    console.log("drivers : " + JSON.stringify(newData[0]));
            })
        }
        getData()
    }, []);

    return (
        drivers
    )
}

export default GetDrivers