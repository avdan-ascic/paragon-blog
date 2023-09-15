import { Routes, Route } from "react-router-dom";

import Header from "./components/core/Header";
import Home from "./components/core/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/blog/Profile";
import EditProfile from "./components/blog/EditProfile";
import CreatePost from "./components/blog/CreatePost";
import AllPosts from "./components/blog/AllPosts";
import MyPosts from "./components/blog/MyPosts";
import SearchPosts from "./components/blog/SearchPosts";
import UpdatePost from "./components/blog/UpdatePost";
import Post from "./components/blog/Post";

const MainRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/search-posts" element={<SearchPosts />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </>
  );
};

export default MainRouter;
