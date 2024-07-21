const jwt = require('jsonwebtoken');

const validateJwt = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "User not authorized!" });
                }
                req.user = decoded.user;
                next();
            });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error!" });
        }
    } else {
        return res.status(401).json({ message: "Authorization header not found!" });
    }
};

module.exports = validateJwt;
