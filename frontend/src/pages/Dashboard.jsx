import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import RejectedDisplay from "../components/RejectedDisplay";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [genderedUsers, setGenderedUsers] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [rejectedUsers, setRejectedUsers] = useState([]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user != null) {
      dispatch(adduser(user));
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  
  //here we go
  const updateRejected = async (rejectedUserId) => {
    
    try {
      const response = await axios.put("http://localhost:8000/add-rejected", {
        userId: user.user_id,
        rejectedUserId,
      });
      getUser();
      const rejectedUser = genderedUsers.find(user => user.user_id === rejectedUserId);
      if(rejectedUser){
        setRejectedUsers(prev => [...prev, rejectedUser]);
      }else{
        console.log('Rejected user not found in genderedUsers')
      }
 

    } catch (err) {
console.log("Error rejecting user:", err.response?.data || err.message);
    }
  };

  const swiped = (direction, swipedUserId) => {
    console.log("Swiped", direction, "on user ID:", swipedUserId);
    if (direction === "right") {
      updateMatches(swipedUserId);
    } else if (direction === "left") {
      console.log("left swipe detecred! rejecting user...");
      
      updateRejected(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );


  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <Link to={"/community"} className="commnunity-headline">
              Community
            </Link>
            <div className="card-container">
             
                {filteredGenderedUsers?.length > 0 ? (
  filteredGenderedUsers.map((genderedUser) => (
    <TinderCard
      className="swipe"
      key={genderedUser.user_id}
      onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
      onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
    >
      <div
        style={{
          backgroundImage: `url(${genderedUser.url})`,
        }}
        className="card"
      >
        <h3>{genderedUser.first_name}</h3>
      </div>
    </TinderCard>
  ))
) : (
  <p>No profiles available right now.</p>
)}

              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};
export default Dashboard;
