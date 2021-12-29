import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { callApi } from "./api";
import {
  AccountForm,
  Posts,
  SinglePost,
  NewPostForm,
  Profile,
} from "./components";

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserData = async (token) => {
    const { data } = await callApi({
      url: "/users/me",
      token,
    });
    return data;
  };

  const fetchPosts = async () => {
    const {
      data: { posts },
    } = await callApi({
      url: "/posts",
    });
    return posts;
  };

  useEffect(async () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }, []);
  const handleclickButton = () => {
    setToken("");
    localStorage.removeItem("token");
    setUserData({});
  };
  return (
    <>
      <h1>Stranger's Things</h1>
      <Link to="/posts/new">Add A Post</Link>
      <Link to="/posts">ALl Posts</Link>
      <Link to="/login">Login</Link>
      <Link to="/" onClick={handleclickButton}>
        Log Out
      </Link>
      <Link to="/Profile">Profiile</Link>

      <Switch>
        <Route exact path="/">
          {userData.username && <div>Hello {userData.username}</div>}
        </Route>
        <Route exact path="/posts">
          <Posts
            posts={posts}
            username={userData.username}
            token={token}
            setPosts={setPosts}
          />
        </Route>
        <Route path="/posts/new">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="add"
          />
        </Route>
        <Route path="/posts/:postId/edit">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="edit"
          />
        </Route>
        <Route path="/posts/:postId">
          <SinglePost posts={posts} />
        </Route>
        <Route path="/register">
          <AccountForm
            action="register"
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/login">
          <AccountForm
            action="login"
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/Profile">
          <Profile userData={userData} token={token} />
        </Route>
      </Switch>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
