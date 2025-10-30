import React, { useEffect, useState } from "react";

interface PostProps {
  title: string;
  body: string;
}

const Weather = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl flex flex-col justify-center mx-auto items-center">
      <h1 className="text-3xl font-bold">Posts</h1>
      <button
        onClick={fetchPosts}
        className="inline-flex self-start bg-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium cursor-pointer mb-5"
      >
        Fetch
      </button>
      {loading && <p>Loading...</p>}
      <div className="space-y-5">
        {posts.map((post, i) => {
          return (
            <div
              key={i}
              className="flex flex-col bg-gray-200 p-4 rounded-md shadow-lg"
            >
              <h1 className="text-lg font-semibold">{post.title}</h1>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>

      {/* <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">search</button>
      </form> */}
    </div>
  );
};

export default Weather;
