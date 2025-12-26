const jwt = require("jsonwebtoken");
const JWT_SECRET = "I am a good boy.";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ Error: "Token Missing" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).json({ Error: "Please authenticate with a valid token" });
    }
    // res.send(data.user.id);
}

module.exports = fetchUser;