import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    socket.onmessage = (event) => {
      console.log(`Mensaje del servidor: ${event.data}`);
    };

    socket.onclose = (event) => {
      console.log("Desconectado del servidor WebSocket", event);
    };

    socket.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    fetch("/api")
      .then((response) => response.text())
      .then((data) => console.log("Respuesta del backend:", data))
      .catch((error) =>
        console.error("Error al conectar con el backend:", error),
      );

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>¡Hola desde el frontend!</h1>
    </div>
  );
}

export default App;
