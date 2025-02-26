import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!");
    } catch (error) {
      console.error("Error logging in user: ", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <LogIn onClick={handleLogin}>Login</LogIn>
    </div>
  );
}