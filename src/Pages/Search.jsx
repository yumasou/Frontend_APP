import React, { useState } from "react";
import User from "../Components/User";
import { useDebounce } from "@uidotdev/usehooks";
import { searchUsers } from "../libs/fetcher";
import { useQuery } from "react-query";
function Search() {
  const [search, setSearch] = useState();
  const deboundedQuery = useDebounce(search, 500);
  const { data, error, isLoading, isError } = useQuery(
    ["searchs", deboundedQuery],
    () => {
      return searchUsers(deboundedQuery);
    }
  );
  console.log(search, data);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto my-5">
      <div className="my-5">
        <input
          onKeyUp={(e) => {
            setSearch(e.target.value);
            e.preventDefault();
          }}
          type="text"
          placeholder="search"
          className="border w-full rounded-lg indent-3 leading-10 focus:outline-none text-slate-600 text-pretty tracking-wide"
        />
      </div>
      <div>
        {data.map((m) => (
          <User key={m.id} user={m} />
        ))}
      </div>
    </div>
  );
}

export default Search;
