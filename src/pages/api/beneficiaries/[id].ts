import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import connection from '../../../utils/database'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {method, body, query: {id}} = req

  switch(method) {
    case 'PUT':
      try {
        const token = req.headers.authorization
        if (!token) {
          return res.status(401).json({message: 'Not autenticated'})
        }
        const payload = jwt.verify(token, process.env.SECRET as string)
        const [rows, fields] = await connection.query('UPDATE beneficiaries SET fullname = ?, hampers = ?, age =?, gender = ? WHERE id_beneficiary = ?',
        [body.fullname, body.hampers, body.age, body.gender, id])
        return res.status(200).json({message: 'Hampers successfully updated', rows})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
    case 'GET':
      try {
        const token = req.headers.authorization
        if (!token) {
          return res.status(401).json({message: 'Not autenticated'})
        }
        const [rows, fields] = await connection.execute('SELECT beneficiaries.fullname, beneficiaries.hampers, beneficiaries.age, beneficiaries.gender, beneficiaries.delivered_at, users.username FROM beneficiaries INNER JOIN users ON beneficiaries.id_user=users.id_user WHERE id_beneficiary = ?', [id])
        return res.status(200).json({message: 'Get one beneficiarie', rows})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
      
  }
}