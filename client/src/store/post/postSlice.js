import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { readAll } from "../../api/post-api";

axios.defaults.withCredentials = true;

const fetchPosts = createAsyncThunk("setPosts/fetchPosts", async () => {
  const response = await readAll();
  return response;
});

export const initializePost = () => {
  return async (dispatch) => {
    try {
      await dispatch(fetchPosts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    myPosts: [],
    searchPosts: [],
    searchTerm: "",
  },
  reducers: {
    addPost: (state, action) => {
      let tempPosts = [...state.posts];
      tempPosts.splice(0, 0, action.payload);
      state.posts = tempPosts;

      let tempMyPosts = [...state.myPosts];
      tempMyPosts.splice(0, 0, action.payload);
      state.myPosts = tempMyPosts;
    },
    updatePost: (state, action) => {
      let tempPosts = [...state.posts];
      const tempIndex = tempPosts.findIndex(
        (p) => p._id === action.payload._id
      );
      tempPosts.splice(tempIndex, 1, action.payload);
      state.posts = tempPosts;

      let tempMyPosts = [...state.myPosts];
      const tempMyIndex = tempPosts.findIndex(
        (p) => p._id === action.payload._id
      );
      if (tempMyIndex) tempMyPosts.splice(tempMyIndex, 1, action.payload);
      state.myPosts = tempMyPosts;
    },
    setMyPosts: (state, action) => {
      let tempPosts = [...state.posts];
      let tempMyPosts = [];
      for (const post of tempPosts) {
        if (post.postedBy._id === action.payload) tempMyPosts.push(post);
      }

      state.myPosts = tempMyPosts;
    },
    searchPosts: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
      state.searchPosts = action.payload.posts;
    },
    removePost: (state, action) => {
      let tempPosts = [...state.posts];
      const tempIndex = tempPosts.findIndex((p) => p._id === action.payload);
      tempPosts.splice(tempIndex, 1);
      state.posts = tempPosts;

      let tempMyPosts = [...state.myPosts];
      const tempMyIndex = tempPosts.findIndex((p) => p._id === action.payload);
      if (tempMyIndex) tempMyPosts.splice(tempMyIndex, 1);
      state.myPosts = tempMyPosts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (action) => {
        console.log(action.error);
      });
  },
});

export const selectPosts = (state) => state.post.posts;
export const selectMyPosts = (state) => state.post.myPosts;
export const selectSearchTerm = (state) => state.post.searchTerm;
export const selectSearchPosts = (state) => state.post.searchPosts;

export const { addPost, updatePost, setMyPosts, searchPosts, removePost } =
  postSlice.actions;

export default postSlice.reducer;
