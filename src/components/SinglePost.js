import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../api";

const SinglePost = ({ posts, token }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  console.log("SINGLE POST", post);
  const [content, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { message },
      } = await callApi({
        url: `/posts/${postId}/messages`,
        method: "POST",
        body: {
          message: {
            content: content,
          },
        },
        token,
      });
      setMessage("");
    } catch (error) {
      console.error("error sending message ", error);
    }
  };
  return (
    <>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Delivers: {post.willDeliver ? "Yes" : "No"}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              value={content}
              onChange={(event) => setMessage(event.target.value)}
            ></input>
            <button type="submit">Send Message</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SinglePost;
