import React, { useState } from "react";
import { auth, twitterProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const TwitterAuth = () => {

    const [username, setUsername] = useState("");
     const [user, setUser] = useState(null);

  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;
        const displayName = user.displayName || "Unknown User";
        setUser(user);
      setUsername(displayName);
      console.log("Twitter Username:", displayName);
    } catch (error) {
      console.error("Error during Twitter login:", error);
    }
  };

    const handleTwitterLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state on logout
      console.log("User signed out.");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div>
          {username ?
              <button onClick={handleTwitterLogout}>Disconnect</button>
              :
              <button onClick={handleTwitterLogin}>Login with Twitter</button>}
      {username && <p>Welcome, {username}!</p>}
    </div>
  );
};

export default TwitterAuth;
