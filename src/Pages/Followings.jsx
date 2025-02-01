import React from "react";
import User from "../Components/User";
import { useQuery } from "react-query";
import { fetchFollowings } from "../libs/fetcher";
import { useParams } from "react-router-dom";
function Followings() {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery("followings", () =>
    fetchFollowings(id)
  );
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Is Error</div>;
  }
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto">
      <h1 className="font-bold text-3xl text-center my-5">Followings</h1>
      {data && data.map((m) => <User key={m.id} user={m.following} />)}
    </div>
  );
}

export default Followings;
