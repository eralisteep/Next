import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./firebase.config";

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
  return querySnapshot;
}

export default getUsers;