const jwt = require("jsonwebtoken");

// Verify the logged user token
const authjwt = (req, res, next) => {
    // Get auth header value 
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        // extract the token from the header
        const token = bearerHeader.split(' ')[1];

        // verify the token
        const secretKey = process.env.SECRET_KEY;
        const decodedToken = jwt.verify(token, secretKey);

        // add payload to the request
        if (!decodedToken)
            throw new Error("UNAUTHORIZED").status(401);

        const { id } = decodedToken;
        req.userId = id;
        next();
    } else {
        res.status(403).json({ message: "ACCESS_FORBIDDEN" });
    }
}

module.exports = authjwt;