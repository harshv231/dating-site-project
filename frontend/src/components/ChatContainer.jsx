import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import RejectedDisplay from "./RejectedDisplay";
import { use, useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);
  const [showRejected, setShowRejected] = useState(false);


  //here we go 

  const handleShowMatches = () => {
    setClickedUser(null);
    setShowRejected(false);
  };

  const handleShowRejected = () => {
    setClickedUser(null);
    setShowRejected(true);
  };


  return (
    <div className="chat-container">
      <ChatHeader user={user} clickedUser={clickedUser}/>

      <div>
        <button className="option" onClick={handleShowMatches}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
        <button className="option" onClick={handleShowRejected}>
          Rejected
        </button>
      </div>

      {!clickedUser && !showRejected && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {!clickedUser && showRejected && (
        <RejectedDisplay rejected = {user.rejected} setClickedUser={setClickedUser} />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
};

export default ChatContainer;
