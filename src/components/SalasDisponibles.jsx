import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';

const SalasDisponibles = () => {
  const [salas, setSalas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
    });
  }, []);

  useEffect(() => {
    const obtenerSalas = async () => {
      try {
        const data = await db.collection('admin@admin.com').where('disponibilidad', '==', true).get();
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSalas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerSalas();
  }, []);

  const filtrarSalas = (e) => {
    setFiltro(e.target.value);
  };

  const salasFiltradas = salas.filter((sala) => {
    return sala.nombre.toLowerCase().includes(filtro.toLowerCase());
  });

  const reservarSala = async (id) => {
    try {
      const sala = await db.collection('admin@admin.com').doc(id).get();
      if (sala.data().disponibilidad) {
        await db.collection('reservas').add({
          usuario: usuario.uid,
          salaId: id,
          salaNombre: sala.data().nombre,
          salaDescripcion: sala.data().descripcion,
          salaCapacidad: sala.data().capacidad,
          salaUbicacion: sala.data().ubicacion,
        });
        await db.collection('admin@admin.com').doc(id).update({ disponibilidad: false });
        // Actualizar la interfaz de usuario para mostrar que la sala está reservada
      } else {
        alert('La sala ya está reservada');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Salas Disponibles</h1>
      <input
        type='text'
        value={filtro}
        onChange={filtrarSalas}
        placeholder='Buscar sala'
        className='form-control mb-5'
      />
      {usuario ? (
        <p>Bienvenido, {usuario.email}</p>
      ) : (
        <p>Inicia sesión para reservar una sala</p>
      )}
      {salasFiltradas.length === 0 ? (
        <p className='text-center mt-5'>No hay salas disponibles en este momento.</p>
      ) : (
        <ul className='list-group'>
          {salasFiltradas.map((sala) => (
            <li key={sala.id} className='list-group-item text-center'>
              <h2>{sala.nombre}</h2>
              <p>Descripción: {sala.descripcion}</p>
              <p>Capacidad: {sala.capacidad}</p>
              <p>Ubicacion: {sala.ubicacion}</p>
              <button onClick={() => reservarSala(sala.id)} className='btn btn-primary'>
                Reservar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalasDisponibles;