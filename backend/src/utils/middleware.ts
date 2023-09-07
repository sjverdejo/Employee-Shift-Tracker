import { Request, Response, NextFunction } from 'express'

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'PostgresError') {
    return response.status(400).send({ error: 'Postgres Error' })
  }

  next(error)
}

export default { unknownEndpoint, errorHandler }