import http from "./httpService";
import { api } from "../config.js";

export const createReply= (commentBody, id) => {
  return http.post(api.repliesEndPoint + "/create/" + id, {
    comment: commentBody.comment,
  });
}