import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../api";

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    alignItems: "center",
  },
  searchInput: {
    margin: "0 16px",
  },
};

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;

  const toMatch = [description, location, title, username];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Posts = ({ posts, username, setPosts, token }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handledelete = async (event, postId) => {
    event.preventDefault();
    await callApi({
      url: `/posts/${postId}`,
      method: "DELETE",
      token,
    });
    const keepPost = posts.filter((post) => postId !== post._id);
    setPosts(keepPost);
  };

  const postsToDisplay = posts.filter((post) => postMatches(post, searchTerm));
  return (
    <>
      <div style={styles.searchContainer}>
        <h2>Posts</h2>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="search for posts"
          value={searchTerm}
          onChange={(event) => {
            console.log(event.target.value);
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {postsToDisplay.length ? (
        postsToDisplay.map((post) => (
          <div key={post._id} style={{ border: "1px solid black" }}>
            <h5>{post.title}</h5>
            <div>Posted by: {post.author.username}</div>
            <div>Description: {post.description}</div>
            <div>Location: {post.location}</div>
            <button onClick={() => history.push(`/posts/${post._id}`)}>
              View Post
            </button>
            {post.author.username === username ? (
              <button onClick={(event) => handledelete(event, post._id)}>
                Delete
              </button>
            ) : null}
          </div>
        ))
      ) : (
        <div>No posts to display</div>
      )}
    </>
  );
};

export default Posts;
