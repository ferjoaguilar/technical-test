import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import connection from '../../../../utils/database'


export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {method, body} = req

  switch (method) {
    case 'POST':
      try {
        body.password = bcrypt.hashSync(body.password, 10)
        const [rows, fields] = await connection.query(`INSERT INTO users(fullname, username, password) VALUES (?,?,?)`, [body.fullname, body.username, body.password])
        return res.status(200).json({message:'New user created', rows})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
  }
}