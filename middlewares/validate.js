const yup = require('yup');
const { BadRequestError } = require('../utils/appErrors');

const productSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    subcategoryId: yup.string().required(),
});

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    location: yup.string().required(),
    phone: yup.string().required(),
});


const userValidate = async (req, res, next) => {
    try {
        await userSchema.validate(req.body);
        next();
    } catch (error) {
        next(new BadRequestError(null, error.errors));
    }
}

const productValidate = async (req, res, next) => {
    try {
        await productSchema.validate(req.body);
        next();
    } catch (error) {
        next(new BadRequestError(null, error.errors));
    }
}

module.exports = { userValidate, productValidate };
