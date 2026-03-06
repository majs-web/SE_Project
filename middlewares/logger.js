// middleware = a JavaScript functtion that runs on the server
// whenever a request comes in but before the route function is 
// executed.

// A logger is used to print in the console - usually (bare min),
// people log when a request comes in + some info about it.

export const logger = (request, response, next) => {
    console.log(
        new Date().toUTCString(),
        'Request from',
        request.ip,
        request.method,
        request.originalUrl
    )
    next()
}

// next() represents functions that will run after this middleware.