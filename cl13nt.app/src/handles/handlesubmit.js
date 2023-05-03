// just testing the way that's working
import { addDoc, collection } from '@firebase/firestore'
import { firestore } from "../firebase/firebase"

const handleSubmit = (testdata) => {
    const ref = collection(firestore, "test data"); // firebase creates

    let data = {
        testData: testdata
    }
    try {
        addDoc(ref, data)
    } catch (err) {
        console.log(err)
    }
}

export default handleSubmit
// now yo can use this function inside your App.js file or other.