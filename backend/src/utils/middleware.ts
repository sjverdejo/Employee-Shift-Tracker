import { Request, Response, NextFunction } from 'express'

//unknown endpoint middleware
const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//error handler endpoint
const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'PostgresError') {
    return response.status(400).send({ error: 'Postgres Error' })
  } else if (error.name === 'UNDEFINED_VALUE') {
    return response.status(400).send({ error: 'Undefined Values' })
  }

  next(error)
}

export default { unknownEndpoint, errorHandler }