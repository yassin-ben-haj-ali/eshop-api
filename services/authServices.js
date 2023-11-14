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
    await emailService.sendEmailVerifyAccount(token)
    return { user, token };
};


const login = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AuthorizationError();
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new AuthorizationError();
    const token = jwt.sign(
        {
            sub: user._id,
        },
        process.env.TOKEN_PASSWORD
    );
    return { user, token };
};


const verifyAccount = async (token) => {
    if (!token) throw new BadRequestError();
    const { sub, exp } = jwt.verify(token, process.env.TOKEN_PASSWORD);
    const user = await UserModel.findById(sub);
    if (!user) throw new BadRequestError();
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (exp < currentTimestamp) throw new BadRequestError('Token has expired');
    user.emailVerifiedAt = new Date();
    await user.save();
    return { message: 'Success' };
};


module.exports = {
    register,
    login,
    verifyAccount
};








