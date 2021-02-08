import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  SearchOutlined,
  AttachFile,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  console.log(messages[messages.length - 1]?.timestamp);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages[messages.length - 1]?.timestamp !== undefined
              ? "Last seen " +
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toLocaleTimeString()
              : "No message sent yet"}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, key) => (
          <p
            key={key}
            className={`chat__message
         ${message.name === user.displayName && "chat__reciever"}`}
          >
            <span
              className={` ${
                message.name === user.displayName
                  ? "chat__nameReciever"
                  : "chat__name"
              } `}
            >
              {message.name}
            </span>
            <span className={` ${
                message.name === user.displayName
                  ? "chat__messageContentReciever"
                  : "chat__messageContent"
              } `}>{message.message}</span>
            <span
              className={`chat__timestamp ${
                message.name === user.displayName && "chat__timestampReciever"
              }`}
            >
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <form>
          <input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={sendMessage}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
