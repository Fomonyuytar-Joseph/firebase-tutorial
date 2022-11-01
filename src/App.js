import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import "./App.css";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const UserDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(UserDoc, newFields);
  };

  const deleteUser = async (id)=>{
    const UserDoc = doc(db, "users", id);
    await deleteDoc(UserDoc)


  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
            <button onClick={() => updateUser(user.id, user.age)}>
              Increase Age
            </button>
            <button onClick={deleteUser(user.id )}>
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
