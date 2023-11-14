const AuthService = require('../services/authServices');

const register = async (req, res) => {
    const user = await AuthService.register(req.body);
    return res.status(201).json(user);
};

const login = async (req, res) => {
    const user = await AuthService.login({ ...req.body });
    return res.status(200).json(user);
};

module.exports = {
    register,
    login,
};