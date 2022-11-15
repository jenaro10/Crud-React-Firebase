import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from "@firebase/util";
const MySwal = withReactContent(Swal)

const Show = () => {
    // 1. configuramos los hooks
    const [users, setUsers] = useState ( [] )

    // 2. referencias a  la firebase
    const usersCollection = collection(db, "users")

    // 3. funcion mostrar odos los documents
    const getUsers = async () => {
        const data = await getDocs(usersCollection)

    setUsers(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        )
        
    }

    // 4. Funcion eliminar un doc
    const deleteUsers = async (id) => {
        const usersDoc = doc(db, "users", id)
        await deleteDoc(usersDoc)
        getUsers()
    }

    // 5. Funcion de confirmacion para eliminar sweet alert 2

    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Estas seguro de eliminar el producto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
                // llamamos a la funcion para eliminar
              deleteUsers(id)
              Swal.fire(
                'Eliminar!',
                'Su archivo ha sido eliminado.',
                'success'
              )
            }
          })
    } 


    // 6. usamos useEffect

    useEffect( () => {
        getUsers()
        
    }, [] )
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="d-grid grap-2">
                    <Link to="/create" className="btn btn-secondary mt-2 mb-2" >Create</Link>
                </div>

                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        { users.map( (user) => ( 
                            <tr key={user.id}>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                    <button onClick={ () => confirmDelete(user.id) } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Show