import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase" 

const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            alert('Falta el nombre')
            return
            }
            if (!apellido.trim()) {
            alert('falta el apellido')
            return
            }
    
        const user = doc(db, "users", id)
        const data = {nombre: nombre, apellido: apellido}
        await updateDoc(user, data)
        navigate('/')
    }

    const getUserById = async (id) => {
        const user = await getDoc( doc(db, "users", id) )
        if(user.exists()) {
            //console.log(product.data())
            setNombre(user.data().nombre)    
            setApellido(user.data().apellido)
        }else{
            console.log('El Usuario no existe')
        }
    }

    useEffect( () => {
        getUserById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Usuarios</h1>

                 <form onSubmit={update}>


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
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit