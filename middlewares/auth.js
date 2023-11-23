const jwt = require('jsonwebtoken');
const userModel = require('../models/User');



exports.authenticate = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
    }
    token = token.slice(7, token.length);
    const { sub } = jwt.verify(token, process.env.TOKEN_PASSWORD);
    const user = await userModel.findById(sub);
    if (user) {
        req.user = {
            id: user.id,
            email: user.email,
        };
        return next();
    }
    logger.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
};