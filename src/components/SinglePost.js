import React from "react";
import { useParams } from "react-router-dom";

const SinglePost = ({ posts }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);
  console.log("SINGLE POST", post);
  return (
    <>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Delivers: {post.willDeliver ? "Yes" : "No"}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SinglePost;
