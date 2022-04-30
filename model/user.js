const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/utility');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/), 'Please fill a valid email address'] 
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount', function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;