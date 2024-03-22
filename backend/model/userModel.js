const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'A User Must have a username'],
        // unique: true
    },
    email: {
        type: String,
        require: [true, 'A user Must have a Email Id'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide valid Email id']
    },
    password: {
        type: String,
        require: [true, 'please provide a valid Password'],
        minlength: [8, 'password are not same'],
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre('save', function(next) {
    if (!this.isModified('Password') || this.isNew) return next();
    this.PasswordChangedAt = Date.now() - 1000;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
