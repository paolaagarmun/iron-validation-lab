const { Schema, model} = require('mongoose')

const UserSchema = Schema ({
    name: {type:String},
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["USER", "ADMIN"],
        default: "USER"

    }
})

UserSchema.methods.toJSON = function () {
    const { password, __v, ...user} = this.toObject();
    return user
}

module.exports = model('User', UserSchema);