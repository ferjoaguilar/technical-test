import { InferGetServerSidePropsType } from 'next'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { CookieValueTypes } from 'cookies-next/lib/types'
import { getCookie } from 'cookies-next'
import NavbarAdmin from '../../components/NavbarAdmin'
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

type DataTableType = {
  fullname:string,
  hampers: number,
  username: string,
  age: number,
  gender: string
  delivered_at:string
  id_beneficiary:number
}


const Admin = ({token, decoded}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const router = useRouter()
  const [dataTable, setDataTable] = useState<DataTableType[]>([])

  useEffect(() => {
    const getBeneficiaries = async() => {
      const res = await fetch(`${process.env.BASE_URL}/beneficiaries`,{
        method: 'GET',
        headers: { 'Content-type': 'application/json', 'authorization':token}
      })
      const data = await res.json()
      return setDataTable(data.rows) 
    }
    getBeneficiaries()
  }, [])

  const updateRegister = (id:number) =>{
    router.push(`/admin/update/${id}`)
  }

  
  return (
    <>
      <NavbarAdmin />
      <section className="container">
        <h2 className="mt-4 text-center">Beneficiarios registrados</h2>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre completo</th>
              <th scope="col">Canasta</th>
              <th scope="col">Entregado por</th>
              <th scope="col">Edad</th>
              <th scope="col">Genero</th>
              <th scope="col">Fecha de entrega</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
           {
             dataTable.map((item, index) => {
              return(
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{item.fullname}</td>
                  <td>{item.hampers?"Entregada":"No Entregada"}</td>
                  <td>{item.username}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.delivered_at}</td>
                  <td>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={() => updateRegister(item.id_beneficiary)}
                  >
                    Editar
                  </button>
                  </td>
                </tr>
              )
             })
           }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Admin