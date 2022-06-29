import React, {useEffect, useState} from 'react';
import './App.css';
import io from 'socket.io-client'
const socket = io('http://localhost:3001');

function App() {
    const [messageInput, setMessageInput] = useState<string | null>(null);
    const [messageReceived, setMessageReceived] = useState<string[]>([]);
    //Init
    useEffect(() => {

    }, []);

    const onSubmit = (e: any) => {
        e.preventDefault();
        socket.emit('send_message', {
            message: messageInput
        })
        //Clear messages
        setMessageInput(null)
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessageReceived(prevState => {
                return [...prevState, data.message];
            });
        })
    }, []);


    return (
        <div className="App">
            <form style={{
                margin: '0 auto',
                width: '20%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '30vh',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <label>App chat</label>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <input value={messageInput || ''} onChange={(e) => setMessageInput(e.target.value)}/>
                        <button onClick={onSubmit}>Send</button>
                    </div>
                </div>

                <div style={{
                    flex: '1'
                }}>
                    {
                        messageReceived.length > 0 && messageReceived.map((item) => {
                            return (
                                <div key={item}>
                                    <label>{item}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </form>
        </div>
    );
}

export default App;
