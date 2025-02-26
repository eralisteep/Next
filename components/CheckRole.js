import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const checkUserRole = async (role) => {
  const user = auth.currentUser;
  console.log("User: ", user);
  if (!user) {
    console.log("User is not logged in");
    return false
    } else {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists() && userDoc.data().role === role) {
        console.log("User is an admin");
        return true
    } else {
        console.log("User is not an admin");
        return false
    }
    }
};
