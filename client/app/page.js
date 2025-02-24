"use client"; // Make sure to add this to mark the file as a client-side component

import { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { db } from "../firebase.config"; // Путь к файлу с настройками 
import { collection, query, onSnapshot } from "firebase/firestore"; // Импортируем необходимые методы из Firestore
import createUser from "../controllers/add_user"; // Assuming createUser is a function to add new users
import deleteUser from "../controllers/delete_user"// Assuming deleteUser is a function to delete users
import updateUser from "../controllers/update_user.js"; // Assuming updateUser is a function to update users

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [last, setLast] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  // Слушаем изменения в Firestore (реальное время)
  useEffect(() => {
    const usersCollection = collection(db, "users"); // Путь к коллекции "users" в Firestore
    const q = query(usersCollection);

    // onSnapshot — это метод, который будет автоматически обновлять данные
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() }); // Получаем данные каждого пользователя с id
      });
      setUsers(usersData); // Обновляем состояние с новым списком пользователей
    });

    // Функция очистки подписки при размонтировании компонента
    return () => unsubscribe();
  }, []);

  // Обработчик отправки формы
  const handleSubmit = () => {
    if (editUserId) {
      updateUser(editUserId, { name, age, last }); // Обновляем данные пользователя
      setEditUserId(null);
    } else {
      createUser(name, age, last); // Добавляем нового пользователя
    }
    setName(""); // Очищаем поля формы после отправки
    setAge("");
    setLast("");
  };

  // Обработчик редактирования пользователя
  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setLast(user.last);
    setEditUserId(user.id);
  };

  return (
    <div>
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
        <Button onClick={handleSubmit}>Submit</Button>
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