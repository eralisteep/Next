"use client";

import { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { db } from "../firebase.config";
import { collection, query, onSnapshot } from "firebase/firestore";
import createUser from "../controllers/add_user";
import deleteUser from "../controllers/delete_user";
import updateUser from "../controllers/update_user.js";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [last, setLast] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [isAimEnabled, setIsAimEnabled] = useState(false); // Переключатель прицела
  const [isSoundEnabled, setIsSoundEnabled] = useState(false); // Переключатель звука

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
    <div>
      {isAimEnabled && <img src="/image.png" className="cursor" />}

      <div style={{ marginBottom: "20px" }}>
        <Button onClick={toggleAim}>{isAimEnabled ? "Выключить прицел" : "Включить прицел"}</Button>
        <Button onClick={toggleSound} style={{ marginLeft: "10px" }}>
          {isSoundEnabled ? "Выключить звук" : "Включить звук"}
        </Button>
      </div>

      <Form>
        <Form.Group>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last" />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
        {editUserId && <Button onClick={handleCancel}>Cancel editing</Button>}
      </Form>

      <h1>Users List</h1>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Row key={index}>
            <h2>{user.name}</h2>
            <h2>{user.age}</h2>
            <h2>{user.last}</h2>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => handleEdit(user)}>Edit</button>
          </Row>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
