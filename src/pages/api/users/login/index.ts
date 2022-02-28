import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connection from '../../../../utils/database'
import { OkPacket } from 'mysql2'


export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {method, body} = req

  switch (method) {
    case 'POST':
      try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE username = ?', [body.username])
        if(!rows[0]) {
          return res.status(400).json({message: 'User or password incorrect'});  
        }
        if(!bcrypt.compareSync(body.password, rows[0].password)) {
          return res.status(400).json({message: 'User or password incorrect'}); 
        }

        const payload ={
          sub: rows[0].id_user,
          name: rows[0].fullname
        }
        //Generate JWT
        const token = jwt.sign(payload, process.env.SECRET as string, {expiresIn: '1h'})

        return res.status(200).json({message: 'Autenticated', token})
      } catch (error) {
        return res.status(400).json({message: error}) 
      }
  }
}