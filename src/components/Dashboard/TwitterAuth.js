import React, { useState } from "react";
import { auth, twitterProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const TwitterAuth = ({setTwitterUserName, onTwitterDisconnect }) => {

    const [displayName, setDisplayName] = useState("");
    const [userName, setUserName] = useState("");
    
     const [user, setUser] = useState(null);

  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
        const user = result.user;
        
        const displayName = user.displayName || "Unknown User";
        const userName = user?.reloadUserInfo?.screenName;

        setUserName(userName);
        setTwitterUserName(userName);

        console.log("user:- ", user)
        setUser(user);
      setDisplayName(displayName);
      console.log("Twitter Username:", displayName);
    } catch (error) {
      console.error("Error during Twitter login:", error);
    }
  };

    const handleTwitterLogout = async () => {
        try {
        await signOut(auth);
            setUser(null); // Clear user state on logout
            setDisplayName("");

             if (onTwitterDisconnect) {
        onTwitterDisconnect();
      }
        console.log("User signed out.");
        } catch (error) {
        console.error("Error during logout:", error.message);
        }
  };

  return (
    <div>
          {displayName ?
              <button onClick={handleTwitterLogout} className="connectx-btn px-8 py-3 text-[18px] flex gap-[10px] justify-center items-center">
                  {`@${userName}`}
                  <img src="/disconnect.svg"></img>
              </button>
              :
              <button onClick={handleTwitterLogin} className="connectx-btn px-8 py-3 text-[24px] flex gap-[10px] justify-center items-center">Connect
                <img src="/x.svg"></img>
              </button>}
    </div>
  );
};

export default TwitterAuth;
