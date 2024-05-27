import { useState, useEffect } from 'react'
import { db } from '../firebase'

const Registro = ({ user }) => {
  const [lista, setLista] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [disponibilidad, setDisponibilidad] = useState(true)
  const [capacidad, setCapacidad] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [error, setError] = useState(null)
  const [id, setId] = useState('')

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection(user.email).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  //guardar sala
  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre) return setError('Ingrese el Nombre')
    if (!descripcion) return setError('Ingrese la Descripción')
    if (!capacidad) return setError('Ingrese la Capacidad')
    if (!ubicacion) return setError('Ingrese la Ubicación')

    try {
      const nuevaSala = { nombre, descripcion, disponibilidad, capacidad, ubicacion }
      const dato = await db.collection(user.email).add(nuevaSala)
      setLista([...lista, { id: dato.id, ...nuevaSala }])
      setNombre('')
      setDescripcion('')
      setDisponibilidad(true)
      setCapacidad('')
      setUbicacion('')
      setError(null)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarDato = async (id) => {
    try {
      await db.collection(user.email).doc(id).delete()
      const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error)
    }
  }

  const editar = (elemento) => {
    setModoEdicion(true)
    setNombre(elemento.nombre)
    setDescripcion(elemento.descripcion)
    setDisponibilidad(elemento.disponibilidad)
    setCapacidad(elemento.capacidad)
    setUbicacion(elemento.ubicacion)
    setId(elemento.id)
  }

  const editarDatos = async (e) => {
    e.preventDefault()
    if (!nombre) return setError('Ingrese el Nombre')
    if (!descripcion) return setError('Ingrese la Descripción')
    if (!capacidad) return setError('Ingrese la Capacidad')
    if (!ubicacion) return setError('Ingrese la Ubicación')

    try {
      await db.collection(user.email).doc(id).update({ nombre, descripcion, disponibilidad, capacidad, ubicacion })
      const listaEditada = lista.map((elemento) => (elemento.id === id ? { id, nombre, descripcion, disponibilidad, capacidad, ubicacion } : elemento))
      setLista(listaEditada)
      setModoEdicion(false)
      setNombre('')
      setDescripcion('')
      setDisponibilidad(true)
      setCapacidad('')
      setUbicacion('')
      setError(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>SALAS</h1>
      <div className="row">
        <div className="col-12">
          <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingrese el Nombre"
                onChange={(e) => { setNombre(e.target.value) }}
                value={nombre}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                placeholder="Ingrese la Descripción"
                onChange={(e) => { setDescripcion(e.target.value) }}
                value={descripcion}
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="disponibilidad"
                checked={disponibilidad}
                onChange={(e) => { setDisponibilidad(e.target.checked) }}
              />
              <label className="form-check-label" htmlFor="disponibilidad">
                Disponibilidad
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="capacidad">Capacidad</label>
              <input
                type="number"
                className="form-control"
                id="capacidad"
                placeholder="Ingrese la Capacidad"
                onChange={(e) => { setCapacidad(e.target.value) }}
                value={capacidad}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                type="text"
                className="form-control"
                id="ubicacion"
                placeholder="Ingrese la Ubicación"
                onChange={(e) => { setUbicacion(e.target.value) }}
                value={ubicacion}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {modoEdicion ? 'Editar' : 'Guardar'}
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive col-12">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Disponibilidad</th>
                <th>Capacidad</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.descripcion}</td>
                  <td>{elemento.disponibilidad ? 'Disponible' : 'No Disponible'}</td>
                  <td>{elemento.capacidad}</td>
                  <td>{elemento.ubicacion}</td>
                  <td>
                    <button className="btn btn-warning mr-2" onClick={() => { editar(elemento) }}>Editar</button>
                    <button className="btn btn-danger" onClick={() => { eliminarDato(elemento.id) }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registro