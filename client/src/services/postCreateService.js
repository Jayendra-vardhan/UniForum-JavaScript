import http from "./httpService";
import { api } from "../config.js";

export const createPost = (postBody) => {
  console.log(api.postsEndPoint + "create");
  return http.post(api.postsEndPoint + 'create', {
    title: postBody.title,
    description: postBody.description,
    tags: postBody.tags
  });
}