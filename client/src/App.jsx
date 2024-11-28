import { useEffect } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return <h1>Hola!</h1>;
}

export default App;
