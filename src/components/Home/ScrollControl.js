import { useEffect } from "react";

const ScrollControl = ({ isConnected }) => {
  
  useEffect(() => {
    const handleScroll = () => {
      const targetPosition = isConnected ? window.innerHeight : 0;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    };

    handleScroll(); 
  }, [isConnected]);

  
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetPosition = isConnected ? window.innerHeight : 0;
      window.scrollTo({ top: targetPosition, behavior: "smooth" }); 
    };

    window.addEventListener("scroll", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", preventScroll);
    };
  }, [isConnected]);

  return null; 
};

export default ScrollControl;
