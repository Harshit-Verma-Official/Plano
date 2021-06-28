import axios from "axios";

const instance = axios.create({
  baseURL: "https://classroom-scheduler-api.herokuapp.com/",
});

export default instance;
