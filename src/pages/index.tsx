import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'


type LoginUser ={
  username:string
  password:string
}


const HompePage = () => {

  const router = useRouter()
  const {register, handleSubmit, formState: {errors}} = useForm<LoginUser>()
  const [errorApi, setErrorApi] = useState<string>('')

  const onSubmit = async(data:LoginUser) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/users/login`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const userData = await res.json()
      if(userData.message == 'Username not found'){
        setErrorApi(userData.message)
      }
      router.push('/admin')
      setCookies('token', userData.token)
    } catch (error) {
      setErrorApi(errorApi);
    }
  }


  return (
    <>
       <Navbar />
       <section className="container">
        {
          errorApi?
          <div className="alert alert-danger mt-4" role="alert">
            {errorApi}
          </div>
          :
          ""
        }
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title text-center">Iniciar sesion</h5>

            <form onSubmit={handleSubmit(onSubmit)}>           
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
              <button type="submit" className="btn btn-info">Iniciar Sesion</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default HompePage