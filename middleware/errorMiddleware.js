export default function errorMiddleware(err, req, res, next) {
    return res.status(err.status || 500).json({
        message: err.message || "Something went wrong",
        stack: err.stack,
    })
}
