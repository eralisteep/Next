import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const checkRole = (role) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("User is not logged in");
        resolve(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      resolve(userDoc.exists() && userDoc.data().role === role);
    });
  });
};
