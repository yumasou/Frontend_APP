import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { api, getToken } from "../libs/fetcher";
import { useApp } from "../ThemedApp";

const socketContext = createContext();
export const useSocket = () => {
  return useContext(socketContext);
};
function SocketProvider({ children }) {
  const { auth } = useApp();

  const token = getToken();
  const [socket, setsocket] = useState();
  const [notification,setNotification]=useState({})
  useEffect(() => {
    const newSocket = io(String(api), {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });
    newSocket.on("connect", () => {
      // console.log("websocket connected", newSocket.id);
      newSocket.emit("token", token);
    });
    newSocket.on("Noti", (msg) =>{
      // console.log(msg)
      alert(msg)
      setNotification({msg})
    });
    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });
    setsocket(newSocket);
    return () => {
      newSocket.off("Noti")
      newSocket.disconnect();
    };
  }, [auth]);
  return (
    <socketContext.Provider value={{ socket,notification }}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketProvider;
