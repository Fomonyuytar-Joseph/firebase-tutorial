import { useState,useEffect } from 'react';
import { db } from './firebase-config';
import './App.css';
import {addDoc, collection, getDocs} from "firebase/firestore"

function App() {
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const userCollectionRef = collection(db,"users")

const createUser = async()=>{
  await addDoc(userCollectionRef,{name:newName,age:newAge})

}


  useEffect(() => {
    
    const getUsers = async ()=>{
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    getUsers()
  
    
  }, [])
  
  return (
    <div className="App">
     
      <input type="text" placeholder='Name...' onChange={(e)=>setNewName(e.target.value)} />
      <input type="number" placeholder='Age' onChange={(e)=>setNewAge(e.target.value)} />
      <button onClick={createUser}>Create User</button>
      {
        users.map((user)=>{
          return(
            <div>
              <h1>Name:{user.name}</h1>
              <h1>Age:{user.age}</h1>
            </div>

          )
        })
      }
     
    </div>
  );
}

export default App;
