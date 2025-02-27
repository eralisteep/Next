// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 
import { auth, db } from "../firebase.config";

function createUser(name, age, last) {
  const currentUser = auth.currentUser
  console.log(currentUser.email)
  const docRef = addDoc(collection(db, "informations"), {
    name: name,
    age: age,
    last: last,
    creater: currentUser.email
  });
  return {
    docRef
  };
}

export default createUser;