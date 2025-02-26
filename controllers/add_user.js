// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../firebase.config";

function createUser(name, age, last) {
  const docRef = addDoc(collection(db, "informations"), {
    name: name,
    age: age,
    last: last
  });
  return {
    docRef
  };
}

export default createUser;