import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

/*--------get all the blogs data api------*/

export const getAllBlogs = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getAllBlogs`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

/*--------get single blogs data api------*/

export const getSingleBlog = async (blog_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getSingleBlog/?blog_id=${blog_id}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

/*--------get all blogs data  by sorting ,filtering , pagination api------*/

export const getBlogs = async (page, limit, sortBy, sortOrder, filterdata,filterCategory) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getBlogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterdata=${filterdata}&filterCategory=${filterCategory}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

/*--------adding post(blog) with image and tags api ------*/

export const addPost = async (data) => {
  try {
    console.log(data);
    let result = await axios(`${API_URL_BASE}/addBlog`, {
      method: "POST",
      headers: {
        //"Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
      //withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

/*--------updating blog views api ------*/

export const updateViewAPI = async (blog_id) => {
  try {
    let result = await axios(`${API_URL_BASE}/updateView?blog_id=${blog_id}`, {
      method: "PATCH",
      headers: {
        //"Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
      //withCredentials: true,
      //data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

/*--------get top there blogs data api------*/

export const topThreeBlogAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/topThreeBlog`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};
