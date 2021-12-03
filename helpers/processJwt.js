const jwt = require('jsonwebtoken');
const User = require('../Schemas/User');

const generateJwt = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: id},
            process.env.SECRET_KEY,
            { expiresIn: "4h" },
            (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token);
            }   
        })  
    })
}

const validateJwt = async (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({message: "Token not found"})
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(id);
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"})        
    }
};

const isAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({message: "Need validation first"})
    }
    const { role, name } = req.user;
    if (role !== 'ADMIN') {
        return res.status(401).json({message:`User ${name} is not authorized for such actions`})
    }
    next();
}

module.exports = {
    isAdmin,
    validateJwt,
    generateJwt
}