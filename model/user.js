const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String
});

UserSchema.pre(
    'save',
    async function(next) {
        const user = this;
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
);

UserSchema.pre(
    'findOneAndUpdate',
    async function(next) {
        let password = this._update.$set.password;
        if(password)
            this._update.$set.password = await bcrypt.hash(password, 10)
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
