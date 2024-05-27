import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';

const SalasReservadas = () => {
  const [salasReservadas, setSalasReservadas] = useState([]);
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
    const obtenerSalasReservadas = async () => {
      try {
        const data = await db.collection('reservas').where('usuario', '==', usuario.uid).get();
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSalasReservadas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    if (usuario) {
      obtenerSalasReservadas();
    }
  }, [usuario]);

  const finalizarReserva = async (id) => {
    try {
      await db.collection('reservas').doc(id).delete();
      const salaReservada = salasReservadas.find(sala => sala.id === id);
      await db.collection('admin@admin.com').doc(salaReservada.salaId).update({ disponibilidad: true });
      setSalasReservadas(salasReservadas.filter(sala => sala.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Salas Reservadas</h1>
      {salasReservadas.length === 0 ? (
        <p className='text-center mt-5'>No hay salas reservadas.</p>
      ) : (
        <ul className='list-group'>
          {salasReservadas.map((sala) => (
            <li key={sala.id} className='list-group-item text-center'>
              <h2>{sala.sala}</h2>
              <h2>{sala.salaNombre}</h2>
              <p>Descripción: {sala.salaDescripcion}</p>
              <p>Capacidad: {sala.salaCapacidad}</p>
              <p>Ubicación: {sala.salaUbicacion}</p>
              <button onClick={() => finalizarReserva(sala.id)} className='btn btn-primary'>
                Finalizar reserva
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalasReservadas;