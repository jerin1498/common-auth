import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface UserPayload {
  email: string,
  id: string
}

// adding custome properities to the Request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (err) {
    console.log(err)
  }
  next()
}