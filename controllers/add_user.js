import { addDoc, collection } from "firebase/firestore"; 
import { auth, db } from "../firebase.config";

async function createUser(name, age, last, fileURL) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  if (!name || !age || !last) {
    throw new Error("All fields are required");
  }

  try {
    const docRef = await addDoc(collection(db, "informations"), {
      name: name,
      age: age,
      last: last,
      fileURL: fileURL || "",
      creater: currentUser.email
    });
    return {
      docRef
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export default createUser;