// import React, { useState, useEffect } from "react";
// import ChatComponent from "../components/GlobalChat";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// const Community = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   const [user, setUser] = useState();
//   const userId = cookies.UserId;
//   console.log(user);
//   const getUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/user", {
//         params: { userId },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUser();
//   }, []);
//   return (
//     <div className="App">
//       <ChatComponent name={user?.first_name} />
//     </div>
//   );
// };

// export default Community;



import React, { useState, useEffect } from "react";
import ChatComponent from "../components/GlobalChat";
import axios from "axios";
import { useCookies } from "react-cookie";

const Community = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState();
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="community-page">
      <div className="welcome-banner">
        <h1>💌 Welcome to the Love Lounge, {user?.first_name}! 💕</h1>
        <p>Connect, chat, and find your vibe in the community!</p>
      </div>

      <div className="chat-section">
        <ChatComponent name={user?.first_name} />
      </div>

      <style jsx>{`
        .community-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #ffe6f2;
          min-height: 100vh;
          padding: 20px;
        }

        .welcome-banner {
          text-align: center;
          margin-bottom: 20px;
        }

        .welcome-banner h1 {
          font-size: 2.5rem;
          color: #ff4c61;
        }

        .welcome-banner p {
          font-size: 1.2rem;
          color: #ff6b81;
        }

        .chat-section {
          width: 100%;
          max-width: 800px;
          background: #fff;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Community;




// import React, { useState, useEffect } from "react";
// import ChatComponent from "../components/GlobalChat";
// import axios from "axios";
// import { useCookies } from "react-cookie";

// const Community = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   const [user, setUser] = useState();
//   const userId = cookies.UserId;

//   const getUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/user", {
//         params: { userId },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <div className="community-page">
//       <div className="welcome-banner">
//         <h1>💌 Welcome to the Love Lounge, {user?.first_name}! 💕</h1>
//         <p>Connect, chat, and find your vibe in the community!</p>
//       </div>

//       <div className="chat-section">
//         <ChatComponent name={user?.first_name} />
//       </div>

//       <style jsx>{`
//         .community-page {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background: #ffe6f2;
//           min-height: 100vh;
//           padding: 20px;
//         }

//         .welcome-banner {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .welcome-banner h1 {
//           font-size: 2.5rem;
//           color: #ff4c61;
//         }

//         .welcome-banner p {
//           font-size: 1.2rem;
//           color: #ff6b81;
//         }

//         .chat-section {
//           width: 100%;
//           max-width: 800px;
//           background: #fff;
//           border-radius: 20px;
//           padding: 20px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Community;
