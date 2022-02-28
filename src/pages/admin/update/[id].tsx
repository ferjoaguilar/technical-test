import { CookieValueTypes } from 'cookies-next/lib/types'
import { getCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router'
import NavbarAdmin from '../../../components/NavbarAdmin'
import { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'

export const getServerSideProps = (context) => {
  const { req, res } = context
  const token: CookieValueTypes = getCookie('token', { req, res })
  if(!token){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }
  const decoded = jwt.decode(String(token))
  if(!decoded){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }
  return{props: { token, decoded }}
}

type Update = { 
  fullname:string,
  hampers:boolean,
  age:number,
  gender:string
}

type DataTableType = {
  fullname:string,
  hampers: number,
  age: number,
  gender: string
}

const Update = ({token, decoded}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  const router = useRouter()
  const {register, handleSubmit, formState: {errors}} = useForm<Update>()
  const [errorApi, setErrorApi] = useState<string>('')
  const [dataTable, setDataTable] = useState<DataTableType>()

  useEffect(() => {
    const getBeneficiary = async() => {
      const res = await fetch(`${process.env.BASE_URL}/beneficiaries/${router.query.id}`,{
        method: 'GET',
        headers: { 'Content-type': 'application/json', 'authorization':token}
      })
      const data = await res.json()
      setDataTable(data.rows[0])
    }
    getBeneficiary()
  }, [])


  const onSubmit = async(data:Update) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/beneficiaries/${router.query.id}`,{
        method: 'PUT',
        headers: { 'Content-type': 'application/json', 'authorization':token},
        body: JSON.stringify(data)
      })
      const result = await res.json()
      router.push('/admin')
    } catch (error) {
      setErrorApi(error)
    }
  }
  
  return (
    <>
      <NavbarAdmin />
      <section className="container">
        {
          errorApi?
          <div className="alert alert-danger" role="alert">
            Somithing error in API
          </div>
          :
          ""
        }
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title text-center">Editar Beneficiario</h5>

            <form onSubmit={handleSubmit(onSubmit)}>           
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Nombre de usuario</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="fullname" 
                  {...register('fullname', {required: true, minLength: 5, maxLength: 75})}
                  defaultValue={dataTable?.fullname}
                  placeholder="Escribe tu nombre de usuario"
                />
                  {
                    errors.fullname?.type === 'required' &&
                    <p className="form-text">Nombre de beneficiario es requerido</p> ||
                    errors.fullname?.type === 'minLength' &&
                    <p className="form-text">Minino 5 caracteres</p> ||
                    errors.fullname?.type === 'maxLength' &&
                    <p className="form-text">Maximo 75 caracteres</p>
                  }
              </div>

              <div className="mb-3">
                <label htmlFor="hampers" className="form-label">Canasta</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="hampers" 
                  {...register('hampers')}
                  value={dataTable?.hampers? "Entregada":"No Entregada"}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Edad</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="age" 
                  {...register('age', {required: true, minLength: 1, maxLength: 2, min:18})}
                  defaultValue={dataTable?.age}
                />
                  {
                    errors.age?.type === 'required' &&
                    <p className="form-text">Edad del beneficiario es requerido</p> ||
                    errors.age?.type === 'minLength' &&
                    <p className="form-text">Minino 1 caracteres</p> ||
                    errors.age?.type === 'maxLength' &&
                    <p className="form-text">Maximo 2 caracteres</p> ||
                    errors.age?.type === 'min' &&
                    <p className="form-text">Es necesario ser mayor de edad</p> 
                  }
              </div>


              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select 
                  id="meeting" 
                  className="form-select"
                  defaultValue={dataTable?.gender}
                  {...register('gender', {required: true})}
                >
                  
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              
              <div className="mb-3">
              <button type="submit" className="btn btn-info">Actualizar registro</button>
              </div>
              
            </form>
          </div>
        </div>
      </section>

    </>
  )
}

export default Update