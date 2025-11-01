import React, { useEffect, useState } from "react";

interface CardProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { street: string; suite: string; city: string; zipcode: string };
  website: string;
}

const Card = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CardProps[]>([]);
  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log(res);
    const data = await res.json();
    setData(data);
    setLoading(false);
    console.log("fetched data", data);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (loading) {
    return <div>loading.......</div>;
  }
  return (
    <div className="gap-8 flex flex-col max-w-5xl mx-auto">
      {data.map((user) => {
        return (
          <div
            key={user.id}
            className="bg-linear-to-r from-blue-100 to-purple-100 p-5 rounded-lg shadow-md"
          >
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Hi I am {user.name}</h1>
              <span className="text-sm font-semibold">username: {user.username}</span>
            </div> 
            <h1 className="text-sm">My Email is <strong>{user.email}</strong></h1>
            <h1>
              Address: {user.address.city},{user.address.street},
              {user.address.suite},{user.address.zipcode}
            </h1>
            <h1>website : {user.website}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
