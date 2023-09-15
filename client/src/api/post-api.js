import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/posts/create`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readAll = async () => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/posts/read-all`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readById = async (id) => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/posts/${id}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const search = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/posts/search`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addComment = async (data, id) => {
  try {
    const response = await axios
      .put(`${baseUrl.server}/api/posts/comment/${id}`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const update = async (data, id) => {
  try {
    const response = await axios
      .put(`${baseUrl.server}/api/posts/${id}`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const remove = async (id) => {
  try {
    const response = await axios
      .delete(`${baseUrl.server}/api/posts/${id}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readAll, readById, search, addComment, update, remove };
