import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { UserPlus } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Добавляем пользователя в Firestore с ролью
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Сохранение роли в Firestore
      });

      alert("User registered successfully with role!");
    } catch (error) {
      console.error("Error registering user: ", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <UserPlus onClick={handleRegister} style={{ cursor: "pointer" }}>Register</UserPlus>
    </div>
  );
}
