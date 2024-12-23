const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Estamos conectados");
});

app.use("/", require("./routes"));

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  socket.on("message", (msg) => {
    console.log(`Mensaje recibido: ${msg}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
