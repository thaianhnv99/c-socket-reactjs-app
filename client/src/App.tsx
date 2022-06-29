import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {io, connect} from 'socket.io-client'
const socket = connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(message)

    socket.emit('send_message', {
      message: message
    })

    //Clear messages
    setMessage(null)
  }

  return (
    <div className="App">
      <form style={{
        margin: '0 auto',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '30vh',
      }} onSubmit={onSubmit}>
        <div style={{
          flex: '1'
        }}>
          <label htmlFor="">abc</label>
        </div>


        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>App chat</label>
          <input value={message || ''} onChange={(e)=> setMessage(e.target.value)}/>
        </div>

      </form>
    </div>
  );
}

export default App;
