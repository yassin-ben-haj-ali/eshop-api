const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const { AuthorizationError, AlreadyExistError } = require('../utils/appErrors');
const emailService = require('./emailServices');

const register = async (body) => {
    const exist = await UserModel.findOne({ email: body.email });
    if (exist) throw new AlreadyExistError('Email already registered');
    const user = await UserModel.create({
        ...body,
        password: bcrypt.hashSync(body.password, 10),
    });
    const token = jwt.sign(
        {
            sub: user._id,
        },
        process.env.TOKEN_PASSWORD,
        { expiresIn: '1d' },
    );
    await emailService.sendEmailVerifyAccount({ email: body.email, token });
    return user;
};


const login = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AuthorizationError();
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new AuthorizationError();
    if (!user.emailVerifiedAt) throw new AuthorizationError('EMAIL_NOT_VERFIED');
    return user;
};


module.exports = {
    register,
    login
};








