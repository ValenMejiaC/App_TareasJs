import React, { useState } from 'react';
import './App.css'; // Asegúrate que este archivo existe y lo actualizaremos
import InputTarea from './components/InputTarea';
import ListaTareas from './components/ListaTareas';
function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, { texto: nuevaTarea, completada: false, id: Date.now() }]);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
    setTareas(nuevasTareas);
  };

  const toggleCompletada = (id) => {
    const nuevasTareas = tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(nuevasTareas);
  };

  const editarTarea = (id, nuevoTexto) => {
    const nuevasTareas = tareas.map(tarea =>
      tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
    );
    setTareas(nuevasTareas);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Mi Lista de Tareas</h1>
      </header>
      <main className="app-main">
        <InputTarea agregarTarea={agregarTarea} />
        <ListaTareas
          tareas={tareas}
          eliminarTarea={eliminarTarea}
          toggleCompletada={toggleCompletada}
          editarTarea={editarTarea}
        />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} - App de Tareas React</p>
      </footer>
    </div>
  );
}

export default App;