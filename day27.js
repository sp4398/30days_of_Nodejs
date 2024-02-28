const express = require('express')
const jwt = require('jsonwebtoken');

const app=express();

function authenticateAndAuthorize(requiredRole) {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }

        try {
            const decoded = jwt.verify(token, ''); 

            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
            }

            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    };
}

app.use((req,res,next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

app.get('/admin',authenticateAndAuthorize,(req,res) =>{
    req.setEncoding('Welcome to the admin section');
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});

// module.exports = authenticateAndAuthorize;
