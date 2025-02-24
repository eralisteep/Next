import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.config"; // Импортируйте ваш объект db

async function deleteUser(userId) {
  if (!userId) {
    console.error("Invalid userId", userId);
    return;
  }

  try {
    // Создайте ссылку на документ пользователя
    const userDocRef = doc(db, "users", userId);

    // Удалите документ
    await deleteDoc(userDocRef);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
}

export default deleteUser;