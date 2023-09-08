//unknown endpoint middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
//error handler endpoint
const errorHandler = (error, request, response, next) => {
    console.log(error.name);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'PostgresError') {
        return response.status(400).send({ error: 'Postgres Error' });
    }
    next(error);
};
export default { unknownEndpoint, errorHandler };
