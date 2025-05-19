import React, { useState } from 'react';

function InputTarea({ agregarTarea }) {
  const [tarea, setTarea] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") return;
    agregarTarea(tarea);
    setTarea("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default InputTarea;
