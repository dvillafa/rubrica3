import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState(null);
  const [modoRegistro, setModoRegistro] = useState(true);
  const navigate = useNavigate();

  const guardarDatos = (e) => {
    e.preventDefault();
    if (modoRegistro) {
      if (!nombre) return setError("Ingrese su Nombre");
      if (!apellido) return setError("Ingrese su Apellido");
    }
    if (!email) return setError("Ingrese su Email");
    if (!pass) return setError("Ingrese su Password");
    if (pass.length < 6) return setError("Password mínimo de 6 caracteres");

    setError(null);
    if (modoRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail('');
      setPass('');
      setError(null);
      navigate('/salasdisponibles');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Email no Válido');
      }
      if (error.code === 'auth/user-not-found') {
        setError('Email no Registrado');
      }
      if (error.code === 'auth/wrong-password') {
        setError('Password no coincide');
      }
    }
  }, [email, pass, navigate]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection('usuarios').doc(res.user.email).set({
        email: res.user.email,
        id: res.user.uid,
        nombre,
        apellido,
      });
      console.log(res.user);
      setEmail('');
      setPass('');
      setNombre('');
      setApellido('');
      setError(null);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        setError('Email no Válido');
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Email ya Registrado');
      }
    }
  }, [email, pass, nombre, apellido]);

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>
        {modoRegistro ? 'Registro de usuarios' : 'Login'}
      </h3>
      <div className='row justify-content-center'>
        <div className='col-12'>
          <form onSubmit={guardarDatos}>
            {error && <div className='alert alert-danger'>{error}</div>}
            {modoRegistro ? (
              <>
                <input
                  type='text'
                  className='form-control mb-2'
                  placeholder='Ingrese su Nombre'
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type='text'
                  className='form-control mb-2'
                  placeholder='Ingrese su Apellido'
                  onChange={(e) => setApellido(e.target.value)}
                />
              </>
            ) : (
              <></>
            )}
            <input
              type='email'
              className='form-control mb-2'
              placeholder='Ingrese su Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Ingrese su Password'
              onChange={(e) => setPass(e.target.value)}
            />
            <div className='d-grid gap-2'>
              <button className='btn btn-primary'>
                {modoRegistro ? 'Registrarse' : 'Acceder'}
              </button>
              <button
                className='btn btn-success'
                onClick={() => {
                  setModoRegistro(!modoRegistro);
                }}
                type='button'
              >
                {modoRegistro ? 'Ya estás registrado?' : 'No tienes cuenta?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;