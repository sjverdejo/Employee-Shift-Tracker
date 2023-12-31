import { Request, Response, NextFunction } from 'express'

//To protect routes with authenticated requirement
const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.authenticated) { return next() }
  res.redirect('/api/auth/login')
}

export default authCheck