import axios from "axios";

const API: any = {
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function (id: string) {
    return axios.get("/api/users/" + id);
  },
  getUserByUsername: function (username: string) {
    return axios.get("/api/username/" + username);
  },
  // Deletes the user with the given id
  deleteUser: function (id: string) {
    return axios.delete("/api/users/" + id);
  },
  // UPDATED saveUser route that now includes authentication
  saveUser: function (userData: any) {
    return axios.post("/api/users/signup", userData);
  },

  findOneUser: function (userData: any) {
    return axios.post("/api/users/login", {
      username: userData.userName,
      password: userData.password,
    });
  },

  signOut: function () {
    console.log("signing out");
    return axios.get("/api/users/signout");
  },
};
export default API;
