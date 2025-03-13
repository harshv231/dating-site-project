import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ProfileModal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["user"]);
  const userId = cookies.UserId;

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", {
          params: { userId },
        });

        if (isMounted) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    if (userId) getUser();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="img-container">
          <img src={user.url} alt={`Photo of ${user.first_name || "User"}`} />
        </div>
        <h3>{user.first_name || "N/A"}</h3>
      </div>
      <div className="profile-details">
        <p>
          <strong>ID:</strong> {user._id || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p>
          <strong>About:</strong> {user.about || "N/A"}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {user.dob_month && user.dob_day && user.dob_year
            ? `${user.dob_month}/${user.dob_day}/${user.dob_year}`
            : "N/A"}
        </p>
        <p>
          <strong>Gender Identity:</strong> {user.gender_identity || "N/A"}
        </p>
        <p>
          <strong>Gender Interest:</strong> {user.gender_interest || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;



