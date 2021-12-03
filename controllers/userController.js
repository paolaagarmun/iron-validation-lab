const bcrypt = require('bcrypt')
const User = require('../Schemas/User')
const { generateJwt } = require('../helpers/processJwt')

const signUpUser = async (req, res) => {
    const { email } = req.body;
    const testEmail = await User.findOne({email});
    if (testEmail) {
        return res.status(500).json({message: "Couldn't create user"})
    }
    const user = new User(req.body);
    try {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password, salt)
        user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong, please try again"})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(500).json({message: "Please check credentials"})
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(200).json({token, user})
    }
    const token = await generateJwt(user._id)
    return res.status(200).json({token, user})
}

module.exports = {
    signUpUser,
    loginUser
}