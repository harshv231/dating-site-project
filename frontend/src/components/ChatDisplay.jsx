import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  // Define functions outside of useEffect
  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, [userId, clickedUserId]);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {
      name: user?.first_name,
      img: user?.url,
      message: message.message,
      timestamp: message.timestamp,
    };
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {
      name: clickedUser?.first_name,
      img: clickedUser?.url,
      message: message.message,
      timestamp: message.timestamp,
    };
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );
  //here i added one thing
  const handleProfileClick = (user) => {
    setClickedUser(user);
  };

  return (
    <div>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages} // Pass functions as props
        getClickedUsersMessages={getClickedUsersMessages} // Pass functions as props
      />
    </div>
  );
};

export default ChatDisplay;
