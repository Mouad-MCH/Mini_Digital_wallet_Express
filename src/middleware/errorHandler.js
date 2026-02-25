
const sendError = (err, res) => {
    res.status(err.statusCode).json({ 
        ERROR: err,
        Message: err.message
     })
}

export const errHandler  = (err, req, res, next) => {
     err.status = err.status || "Something wont worng";
     err.statusCode = err.statusCode || 500;

    sendError(err, res)
}