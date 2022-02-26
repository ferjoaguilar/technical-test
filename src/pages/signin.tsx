import { useRouter } from 'next/router'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import Navbar from '../components/Navbar'

type NewUser ={
  fullname:string
  username:string
  password:string
}

const signin = () => {

  const router = useRouter()
  const {register, handleSubmit, formState: {errors}} = useForm<NewUser>()
  const [error, setError] = useState<string>('')


  const onSubmit = async(data:NewUser) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/users/signin`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      router.push('/')
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <Navbar />
      <section className="container">
        {
          error?
          <div className="alert alert-danger" role="alert">
            Somithing error in API
          </div>
          :
          ""
        }
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title text-center">Registrar nuevo usuario</h5>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                id="fullname" 
                {...register('fullname', {required: true, minLength: 5, maxLength: 75})}
                placeholder="Escribe tu nombre completo"/>
                {
                  errors.fullname?.type === 'required' &&
                  <p className="form-text">Nombre completo es requerido</p> ||
                  errors.fullname?.type === 'minLength' &&
                  <p className="form-text">Minimo 5 caracteres</p> ||
                  errors.fullname?.type === 'maxLength' &&
                  <p className="form-text">Maximo 75 caracteres</p>
                }
            </div>
           

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                {...register('username', {required: true, minLength: 5, maxLength: 15})}
                placeholder="Escribe tu nombre de usuario"
              />
                {
                  errors.username?.type === 'required' &&
                  <p className="form-text">Nombre de usuario es requerido</p> ||
                  errors.username?.type === 'minLength' &&
                  <p className="form-text">Minino 5 caracteres</p> ||
                  errors.username?.type === 'maxLength' &&
                  <p className="form-text">Maximo 15 caracteres</p>
                }
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                {...register('password', {required: true, minLength: 5, maxLength: 75})}
                placeholder="contraseña"
              />
              {
                errors.password?.type === 'required' &&
                <p className="form-text">Contraseña es requerido</p> ||
                errors.password?.type === 'minLength' &&
                <p className="form-text">Minino 5 caracteres</p> ||
                errors.password?.type === 'maxLength' &&
                <p className="form-text">Maximo 75 caracteres</p>
              }
            </div>

            <div className="mb-3">
            <button type="submit" className="btn btn-info">Crear nuevo usuario</button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default signin