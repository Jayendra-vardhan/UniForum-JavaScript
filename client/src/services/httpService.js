import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Retrieve the token from localStorage
const token = localStorage.getItem("token");

// Set the token in the default headers if it exists
if (token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred!");
  }

  console.log(error.response.status);
  console.log(error);
  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
