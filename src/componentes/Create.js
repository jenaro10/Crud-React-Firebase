import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {

  const [ nombre, setNombre ] = useState('')
  const [ apellido, setApellido ] = useState('')
  const navigate = useNavigate()

  const usersCollection = collection(db, "users")

  const store = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      alert('Falta el nombre')
      return
      }
      if (!apellido.trim()) {
      alert('falta el apellido')
      return
      }

    await addDoc( usersCollection, {nombre: nombre, apellido: apellido} )
    navigate('/')
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Crear Usuarios</h1>

          <form onSubmit={store}>
              <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input
                  value={nombre}
                  onChange={ (e) => setNombre(e.target.value)}
                  type="text"
                  className='form-control'
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Apellido</label>
                <input
                  value={apellido}
                  onChange={ (e)=> setApellido(e.target.value)}
                  type="text"
                  className='form-control'
                />
              </div>

              <button type='submit' className='btn btn-primary'>Crear</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create