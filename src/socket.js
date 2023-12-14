import { io } from "socket.io-client";

const socket = io("https://prolink-api.onrender.com");

socket.on("connect", () => {
  console.log("Connected to te server!");
});

export default socket;
