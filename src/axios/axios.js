import axios from "axios";

const instance = axios.create({
  baseURL: "https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/",
});

export default instance;
