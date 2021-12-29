import React, { useState, useEffect } from "react";

const Profile = ({ userData, token }) => {
  useEffect(() => {
    setMessages(userData.messages);
    console.log(userData);
    if (userData.posts) {
      setPosts(userData.posts);
    }
  }, [userData]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <div>
      {posts.length &&
        posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid black" }}>
            <h5>{post.title}</h5>
            <div>Posted by: {post.author.username}</div>
            <div>Description: {post.description}</div>
            <div>Location: {post.location}</div>
            <button onClick={() => history.push(`/posts/${post._id}`)}>
              View Post
            </button>
          </div>
        ))}
    </div>
  );
};

export default Profile;
