import React, {useEffect, useState} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { useParams } from 'react-router-dom';
import db from './firebase'
import firebase from 'firebase/compat/app';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();
    const [{user}, dispatch] = useStateValue();
    
    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
               setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp', 'asc' )
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ));
        }

        console.log(messages)

    }, [roomId])

    useEffect(() => {
         setSeed(Math.floor(Math.random() * 5000))

    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("")
    }
  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                <p> Last seen: 
                    {new Date(
                    messages[messages.length - 1]?.
                    timestamp?.toDate()).toUTCString()
                    } </p>
            </div>
            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className='chat__body'>
            {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                <span className='chat__name'>{message.name}</span>
                    {message.message}
                <span className='chat__timestamp'>
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                </p>
            ) )}
               
        </div>
        <div className='chat__footer'>
            <EmojiEmotionsOutlinedIcon/>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Type a message'  ></input>
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <MicOutlinedIcon/>
        </div>
    </div>
  )
}

export default Chat
