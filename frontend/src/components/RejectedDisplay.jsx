// const RejectedDisplay = ({ rejected, setClickedUser }) => {
//   console.log("rejected",rejected);
//   return (
//     <div className="rejected-display">
//       {rejected?.length > 0 ? (
//         rejected.map((user) => (
//           <div  
//             key={user.user_id}
//             className="rejected-profile"
//             onClick={() => setClickedUser(user)}
//           >
//             {user}
//             <img src={user.url} alt={user.first_name} />
//             <h3>{user.first_name}</h3>
//           </div>
//         ))
//       ) : (
//         <p>No rejected profiles yet.</p>
//       )}
//     </div>
//   );
// };



// export default RejectedDisplay;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

// const RejectedDisplay = ({ setClickedUser }) => {
//   const [rejectedProfiles, setRejectedProfiles] = useState(null);
//   const [cookies] = useCookies(null);

//   const userId = cookies.UserId;

//   const getRejectedUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/rejected-users", {
//         params: { userId },
//       });
//       setRejectedProfiles(response.data);
//       console.log("Rejected Profiles:", response.data);
//     } catch (error) {
//       console.log("Error fetching rejected users:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       getRejectedUsers();
//     }
//   }, [userId]);

//   return (
//     <div className="rejected-display">
//       {rejectedProfiles?.map((rejected, _index) => (
//         <div
//           key={_index}
//           className="rejected-card"
//           onClick={() => setClickedUser(rejected)}>
//           <div className="img-container">
//             <img src={rejected?.url} alt={rejected?.first_name + " profile"} />
//           </div>
//           <h3>{rejected?.first_name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RejectedDisplay;




import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const RejectedDisplay = ({ setClickedUser }) => {
  const [rejectedProfiles, setRejectedProfiles] = useState(null);
  const [cookies] = useCookies(null);

  const userId = cookies.UserId;

  const getRejectedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/rejected-users", {
        params: { userId },
      });
      setRejectedProfiles(response.data);
      console.log("Rejected Profiles:", response.data);
    } catch (error) {
      console.log("Error fetching rejected users:", error);
    }
  };

  const handleUnreject = async (rejectedUserId) => {
    try {
      const response = await axios.put("http://localhost:8000/remove-rejected", {
        userId,
        rejectedUserId,
      });
      console.log("Unreject response:", response.data);
      
      getRejectedUsers(); // Refresh the rejected list
    } catch (error) {
      console.log("Error unrejecting user:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getRejectedUsers();
    }
  }, [userId]);

  return (
    <div className="rejected-display">
      {rejectedProfiles?.map((rejected, _index) => (
        <div
          key={_index}
          className="rejected-card"
          onClick={() => setClickedUser(rejected)}>
          <div className="img-container">
            <img src={rejected?.url} alt={rejected?.first_name + " profile"} />
          </div>
          <h3>{rejected?.first_name}</h3>
          <button className="unreject-button"
          onClick={(e) => {
            e.stopPropagation();
            handleUnreject(rejected.user_id);
          }}>
            ❤️Unreject
          </button>
        </div>
      ))}
    </div>
  );   
};

export default RejectedDisplay;