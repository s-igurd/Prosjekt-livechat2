const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("En bruker koblet til");

    socket.on("chat message", (data) => {
        console.log(`Melding fra ${data.user}: ${data.message}`);
        io.emit("chat message", data); // Sender meldingen til alle brukere
    });

    socket.on("disconnect", () => {
        console.log("En bruker koblet fra");
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server kjører på http://localhost:3000");
});