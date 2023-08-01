const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 5000;

const initialBusLocation = {
  longitude: 85.3046,
  latitude: 27.676,
};
// const buses = [
//   {
//     busId: "1",
//     latitude: 27.676,
//     longitude: 85.3046,
//   },
//   {
//     busId: "2",
//     latitude: 85.3046,
//     longitude: 85.3046,
//   },
// ];

const sendLocationUpdates = () => {
  console.log("sending");
  initialBusLocation.latitude =
    initialBusLocation.latitude + Math.random(50) * 0.0001;
  initialBusLocation.longitude =
    initialBusLocation.longitude + Math.random(50) * 0.0001;
  io.emit("busLocationUpdated", initialBusLocation);
};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("initialBusLocation", initialBusLocation);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(sendLocationUpdates, 1000);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
