import React, { useState } from 'react';
import './App.css';
import InputTarea from './components/InputTarea';
import ListaTareas from './components/ListaTareas';

function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="App">
      <h1>📝 Mi Lista de Tareas</h1>
      <InputTarea agregarTarea={agregarTarea} />
      <ListaTareas tareas={tareas} eliminarTarea={eliminarTarea} />
    </div>
  );
}

export default App;
