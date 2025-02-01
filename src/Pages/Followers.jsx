import React from "react";
import { fetchFollowers } from "../libs/fetcher";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import User from "../Components/User";
function Followers() {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery("followers", () =>
    fetchFollowers(id)
  );

  
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Is Error</div>;
  }
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto">
      <h1 className="font-bold text-3xl text-center my-5">Followers</h1>
     { data && data.map(m=>
        <User key={m.id} user={m.follower} />
        )}
      
    </div>
  );
}

export default Followers;
