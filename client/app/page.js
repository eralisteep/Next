"use client";

import { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import { Anvil, Gift, Pencil, Plus, Rotate3D, Spline, Trash2, Volume2, VolumeX, X } from "lucide-react";
import { db, auth } from "../firebase.config";
import { collection, query, onSnapshot } from "firebase/firestore";
import createUser from "../controllers/add_user";
import deleteUser from "../controllers/delete_user";
import updateUser from "../controllers/update_user.js";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [last, setLast] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [isAimEnabled, setIsAimEnabled] = useState(false); // Переключатель прицела
  const [isSoundEnabled, setIsSoundEnabled] = useState(false); // Переключатель звука
  const [animation, setAnimation] = useState("");
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  // Загружаем состояние прицела и звука из localStorage
  useEffect(() => {
    const savedAimState = localStorage.getItem("aimEnabled") === "true";
    const savedSoundState = localStorage.getItem("soundEnabled") === "true";
    setIsAimEnabled(savedAimState);
    setIsSoundEnabled(savedSoundState);
  }, []);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAimEnabled) return; // Если прицел выключен, не включаем его логику

    const cursor = document.querySelector(".cursor");
    const shootSound = new Audio("/1323308625854201938.ogg");

    if (!cursor) {
      console.error("❌ Ошибка: .cursor не найден!");
      return;
    }

    // Двигаем прицел за курсором
    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    // Выстрел при клике
    const shoot = () => {
      cursor.classList.add("shooting");

      if (isSoundEnabled) {
        shootSound.currentTime = 0;
        shootSound.play().catch((error) => console.error("Ошибка воспроизведения:", error));
      }

      setTimeout(() => {
        cursor.classList.remove("shooting");
      }, 150);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("click", shoot);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("click", shoot);
    };
  }, [isAimEnabled, isSoundEnabled]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Функция для переключения прицела
  const toggleAim = () => {
    setIsAimEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("aimEnabled", newState);
      return newState;
    });
  };

  // Функция для переключения звука
  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("soundEnabled", newState);
      return newState;
    });
  };

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = () => {
    if (editUserId) {
      updateUser(editUserId, { name, age, last });
      setEditUserId(null);
    } else {
      createUser(name, age, last);
    }
    setName("");
    setAge("");
    setLast("");
  };

  const handleAnimation = () => {
    if (animation === "") {
      setAnimation("spin");
    } else {
      setAnimation("");}
  }
  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setLast(user.last);
    setEditUserId(user.id);
  };

  const handleCancel = () => {
    setName("");
    setAge("");
    setLast("");
    setEditUserId(null);
  };

  return (
    <div className={animation}>
      {isAimEnabled && <img src="/image.png" className="cursor" />}
      <ThemeToggle/>
      <Rotate3D onClick={handleAnimation} style={{ marginLeft: "10px" }}>
        Анимация
      </Rotate3D>
      <div style={{ marginBottom: "20px" }}>
        <Anvil onClick={toggleAim}>
          {isAimEnabled ? "Выключить прицел" : "Включить прицел"}
        </Anvil>
        {isSoundEnabled ? (
          <Volume2 onClick={toggleSound} style={{ marginLeft: "10px" }}>
            Выключить звук
          </Volume2>
        ) : (
          <VolumeX onClick={toggleSound} style={{ marginLeft: "10px" }}>
            Включить звук
          </VolumeX>
        )}
      </div>

      {user ? (
        <>
          <Logout />
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                placeholder="Last"
              />
            </Form.Group>
            <Plus onClick={handleSubmit}>Submit</Plus>
            {editUserId && <X onClick={handleCancel}>Cancel editing</X>}
          </Form>

          <h1>Users List</h1>
          {users.length > 0 ? (
            users.map((user, index) => (
              <Row key={index}>
                <h2>{user.name}</h2>
                <h2>{user.age}</h2>
                <h2>{user.last}</h2>
                <Trash2 onClick={() => deleteUser(user.id)}>Delete</Trash2>
                <Pencil onClick={() => handleEdit(user)}>Edit</Pencil>
              </Row>
            ))
          ) : (
            <p>Loading</p>
          )}
        </>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        <Gift></Gift>
      </a>
    </div>
  );
}
