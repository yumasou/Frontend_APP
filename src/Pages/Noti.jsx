import React, { useEffect } from "react";
import NotiItem from "../Components/NotiItem";
import { fetchNoti } from "../libs/fetcher";
import { useMutation, useQuery } from "react-query";
import { queryClient, useApp } from "../ThemedApp";
// import { useSocket } from "../Utils/SocketProvider";
import { makeAllNotiRead, makeNotiRead } from "../libs/fetcher";
function Noti() {
  // const {notification}=useSocket()
  
  const { auth, } = useApp();
  const { data, isError, isLoading, error } = useQuery("Notis", fetchNoti);

  const allNotiRead = useMutation(() => makeAllNotiRead(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Notis", auth]);
      queryClient.invalidateQueries("Notis");
    },
  });

  const notiRead = useMutation((id) => makeNotiRead(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Notis", auth]);
    },
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto my-5">
      <div className="float-right my-5">
        <button
          onClick={() => allNotiRead.mutate()}
          className="rounded-lg ring-2 shadow-lg p-2 relative"
        >
          Make all read
        </button>
      </div>
      <div className=" clear-both ">
        {data.map((m) => (
          <NotiItem key={m.id} data={m} makeRead={notiRead.mutate} />
        ))}
      </div>
    </div>
  );
}

export default Noti;
