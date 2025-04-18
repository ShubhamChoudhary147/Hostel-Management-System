const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

module.exports.validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401);
            throw new Error("Token is missing or not authorized");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Authorization header is missing or invalid");
    }
});