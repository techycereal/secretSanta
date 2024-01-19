import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react' 
function App() {
  const [groupName, setGroupName] = useState('')
  const [groupCode, setGroupCode] = useState('')
  const [name, setName] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [myGroup, setMyGroup] = useState({})
  const [user, setUser] = useState('')
  const [item, setItem] = useState('')
  async function startDB(){ 
    console.log(groupName)
    const body = {
      groupName: groupName
    }
    const request = await axios.post('http://localhost:5000/start', body, {
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    console.log(request)
  }
  async function addPerson(){
    const body = {
      groupCode: groupCode,
      name: name
    }
    const request = await axios.post('http://localhost:5000/add', body, {
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    console.log(request.data[0])
    if (request.data){
      console.log(Object.keys(request.data).length)
      setUser(request.data)
    }
  }

  async function Randomize(){
    console.log(groupCode)
    const url = 'http://localhost:5000/random/' + groupCode
    const request = await axios.get(url);
    console.log(request)
  }

  async function signin(){
    console.log(groupCode)
    const url = 'http://localhost:5000/signin/' + groupCode
    const request = await axios.get(url);
    if (typeof(request.data) == 'object'){
      setSignedIn(true)
      setMyGroup(request.data)
    }
  }

  async function write_list(){
    const body = {
      groupCode: groupCode,
      user: user['friend'][0].personId,
      item: item
    }
    const request = await axios.post('http://localhost:5000/write_list', body);
    console.log(request)
  }

  return (
    <div className="App">
      {!signedIn && 
      <>
        <input onChange={(e) => setGroupName(e.target.value)} placeholder='create group'/>
        <button onClick={startDB}>Click</button>
        <input placeholder='Sign into group' onChange={(e) => setGroupCode(e.target.value)}/>
        <button onClick={signin}>Click</button>

      </>
      }
      {Object.keys(user).length >= 1 && 
      <>
      <input placeholder='Write items for your list' onChange={(e) => setItem(e.target.value)}/>
      <button onClick={write_list}>add</button>
      </>
      }
      {signedIn && 
      <>
      <input onChange={(e) => setGroupCode(e.target.value)} placeholder='set group code'/>
      <input onChange={(e) => setName(e.target.value)} placeholder='set person name'/>
      <button onClick={addPerson}>add</button>
      <button onClick={Randomize}>Random</button>
      <p>Group Members</p>
      {myGroup.map((people) => (
        <p>{people.Person}</p>
      ))}
      </>
      }
    </div>
  );
}

export default App;
