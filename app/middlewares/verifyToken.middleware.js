const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified.user;
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;