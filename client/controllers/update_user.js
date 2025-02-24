import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config"; // Импортируйте ваш объект db

async function updateUser(userId, updatedData) {
  if (!userId || !updatedData) {
    console.error("Invalid userId or updatedData", userId, updatedData);
    return;
  }

  try {
    // Создайте ссылку на документ пользователя
    const userDocRef = doc(db, "users", userId);

    // Обновите документ
    await updateDoc(userDocRef, updatedData);
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user: ", error);
  }
}

export default updateUser;