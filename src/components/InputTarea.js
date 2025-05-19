import React, { useState } from 'react';

function InputTarea({ agregarTarea }) {
  const [texto, setTexto] = useState('');

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (texto.trim()) {
      agregarTarea(texto);
      setTexto('');
    }
  };

  return (
    <form className="input-tarea-form" onSubmit={handleSubmit}>
      <input
        className="input-tarea-campo"
        type="text"
        value={texto}
        onChange={handleChange}
        placeholder="Añadir nueva tarea..."
        aria-label="Añadir nueva tarea"
      />
      <button className="input-tarea-boton" type="submit">
        Añadir
      </button>
    </form>
  );
}

export default InputTarea;