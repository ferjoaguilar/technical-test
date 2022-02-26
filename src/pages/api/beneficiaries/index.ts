import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import connection from '../../../utils/database'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {method, body} = req


  switch(method) {
    case 'POST':
      try {
        const token = req.headers.authorization
        if (!token) {
          return res.status(401).json({message: 'Not autenticated'})
        }
        const payload = jwt.verify(token, process.env.SECRET as string)
        
        if(body.age < 18){
          return res.status(400).json({message: 'You have to be over 18 years old'})
        }

        const [rows, fields] = await connection.query
        ('INSERT INTO beneficiaries(fullname, hampers, id_user, age, gender) VALUES (?,?,?,?,?)',
        [body.fullname, body.hampers, payload.sub, body.age, body.gender])
        return res.status(200).json({message: 'Hampers successfully inserted', rows})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
    case 'GET': {
      try {
        const token = req.headers.authorization
        if (!token) {
          return res.status(401).json({message: 'Not autenticated'})
        }
        const payload = jwt.verify(token, process.env.SECRET as string)

        const [rows, fields] = await connection.execute('SELECT beneficiaries.id_beneficiary, beneficiaries.fullname, beneficiaries.hampers, beneficiaries.age, beneficiaries.gender, beneficiaries.delivered_at, users.username FROM beneficiaries INNER JOIN users ON beneficiaries.id_user=users.id_user')
        return res.status(200).json({message: 'Beneficiaries list', rows})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
    }
  }
}