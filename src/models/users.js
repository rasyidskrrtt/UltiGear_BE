const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, 'Username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: { 
        type: String,
        enum: ['ADMIN', 'CUSTOMER'],
        default: 'CUSTOMER',
        required: true,
    },
    photo_url: {
        type: String,
        default: 'https://example.com/chillGuy.jpg',
    },
}, {
    timestamps: true, 
});

// Hash password sebelum menyimpan
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Metode untuk membandingkan password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = userSchema;
