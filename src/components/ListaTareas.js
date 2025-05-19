import React, { useState, useRef, useEffect } from 'react';

function ListaTareas({ tareas, eliminarTarea, toggleCompletada, editarTarea }) {
  if (!tareas.length) {
    return <p className="lista-vacia">¡Genial! No tienes tareas pendientes.</p>;
  }

  return (
    <ul className="lista-tareas-ul">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          eliminarTarea={eliminarTarea}
          toggleCompletada={toggleCompletada}
          editarTarea={editarTarea}
        />
      ))}
    </ul>
  );
}

function Tarea({ tarea, eliminarTarea, toggleCompletada, editarTarea }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tarea.texto);
  const inputRef = useRef(null); // Para enfocar el input al editar

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Seleccionar todo el texto para facilitar la edición
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEliminar = () => {
    eliminarTarea(tarea.id);
  };

  const handleCompletar = () => {
    toggleCompletada(tarea.id);
  };

  const handleEditar = () => {
    setIsEditing(true);
  };

  const handleGuardarEdicion = () => {
    if (editText.trim()) {
      editarTarea(tarea.id, editText);
      setIsEditing(false);
    } else {
      // Opcional: si el texto está vacío, eliminar la tarea o restaurar
      // Por ahora, solo cancelamos la edición si está vacío
      setIsEditing(false);
      setEditText(tarea.texto); // Restaura el texto original
    }
  };

  const handleCancelarEdicion = () => {
    setIsEditing(false);
    setEditText(tarea.texto); // Restaura el texto original
  };

  const handleChangeEdicion = (event) => {
    setEditText(event.target.value);
  };

  const handleKeyDownEdicion = (event) => {
    if (event.key === 'Enter') {
      handleGuardarEdicion();
    } else if (event.key === 'Escape') {
      handleCancelarEdicion();
    }
  };

  return (
    <li className={`tarea-item ${tarea.completada ? 'tarea-completada' : ''} ${isEditing ? 'tarea-editando' : ''}`}>
      {isEditing ? (
        <div className="tarea-modo-edicion">
          <input
            ref={inputRef}
            className="tarea-input-edicion"
            type="text"
            value={editText}
            onChange={handleChangeEdicion}
            onKeyDown={handleKeyDownEdicion}
            onBlur={handleGuardarEdicion} // Guardar también si pierde el foco
            aria-label="Editar tarea"
          />
          <div className="tarea-botones-edicion">
            <button className="boton-accion boton-guardar" onClick={handleGuardarEdicion} aria-label="Guardar cambios">
              Guardar
            </button>
            <button className="boton-accion boton-cancelar" onClick={handleCancelarEdicion} aria-label="Cancelar edición">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="tarea-modo-vista">
          <div className="tarea-contenido">
            <input
              type="checkbox"
              className="tarea-checkbox"
              checked={tarea.completada}
              onChange={handleCompletar}
              id={`checkbox-${tarea.id}`}
              aria-labelledby={`texto-tarea-${tarea.id}`}
            />
            <label
              htmlFor={`checkbox-${tarea.id}`}
              className="tarea-checkbox-label"
              aria-label="Marcar como completada"
            >
                <span className="checkbox-custom"></span>
            </label>
            <span
              id={`texto-tarea-${tarea.id}`}
              className={`tarea-texto ${tarea.completada ? 'texto-tachado' : ''}`}
              onClick={handleCompletar} // Permitir click en texto para completar
            >
              {tarea.texto}
            </span>
          </div>
          <div className="tarea-acciones-vista">
            <button className="boton-accion boton-editar" onClick={handleEditar} aria-label="Editar tarea">
              Editar
            </button>
            <button className="boton-accion boton-eliminar" onClick={handleEliminar} aria-label="Eliminar tarea">
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default ListaTareas;