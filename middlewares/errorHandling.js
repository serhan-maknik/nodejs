module.exports = (err, req, res, next) => {
    console.log("ERORRORRR: ", err);
    res.status(err.statusCode).json(err)
}