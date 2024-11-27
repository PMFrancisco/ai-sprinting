const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io  = new Server(server,{
  cors: {
    origin: '*',
  }
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
  console.log(`usuario conectado: ${socket.id}`)
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`)
})