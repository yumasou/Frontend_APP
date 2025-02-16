import { useEffect,  useState } from "react";
import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { api, getToken } from "../libs/fetcher";
import { queryClient, useApp } from "../ThemedApp";

const socketContext = createContext();
export const useSocket = () => {
  return useContext(socketContext);
};
function SocketProvider({ children }) {
  const { auth, setGlobalmsg } = useApp();
  const token = getToken();
  const [socket, setsocket] = useState();
  const [notification, setNotification] = useState({});
  const [message,setMessage]=useState(null)

  useEffect(() => {
    if (auth) {
      const newSocket = io(String(api), {
        transports: ["websocket"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        auth:{
          token:token
        }
      });
      newSocket.on("connect", () => {
        // console.log("socket Connected",newSocket.id)
        newSocket.emit("token", token);
      });

      newSocket.on("Noti", (msg) => {
        setGlobalmsg({ massage: msg });
        setNotification({ msg });
      });

      newSocket.on("newMessage",(msg)=>{
        queryClient.invalidateQueries(["massages",msg.message.chatId])
        setMessage(msg)
        
      })
      newSocket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason);
      });
      setsocket(newSocket);
      return () => {
        newSocket.off("Noti");
        newSocket.off("newMessage")
        newSocket.disconnect();
      };
    }
  }, [auth,token]);
  return (
    <socketContext.Provider value={{ socket, notification,message,setMessage }}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketProvider;
