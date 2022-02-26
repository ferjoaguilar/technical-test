import type { NextApiRequest, NextApiResponse } from 'next'


export default (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req

  switch (method) {
    case 'GET':
      try {
        return res.status(200).json({message: 'Hello'})
      } catch (error) {
        return res.status(400).json({message: 'Error'}) 
      }
    case 'POST':
      try {
        return res.status(200).json({message: 'Hello Post'})
      } catch (error) {
        return res.status(400).json({message: 'Error'}) 
      }
  }
}