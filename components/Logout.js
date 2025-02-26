import { getAuth, signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

export default function Logout() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out user: ", error);
      alert(error.message);
    }
  };

  return <LogOut onClick={handleLogout}>Logout</LogOut>;
}