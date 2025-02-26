import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase.config.js";

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "informations"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
  return querySnapshot;
}

export default getUsers;