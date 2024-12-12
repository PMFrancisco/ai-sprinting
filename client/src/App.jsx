import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => console.log("Respuesta del backend:", data))
      .catch((error) =>
        console.error("Error al conectar con el backend:", error),
      );
  }, []);

  return (
    <div>
      <h1>¡Hola desde el frontend!</h1>
    </div>
  );
}

export default App;
