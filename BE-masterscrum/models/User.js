const mongoose = require('mongoose');

const Schema = mongoose.Schema;
AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema(
    {
        userID : { type: Number},
        name: {type: String , require: true},
        email: {type: String , require: true, unique: true},
        phone: {type: String , require: true},
        password: { type: String, require: true },
        role: {type: String, require: true},
        faculty: [{
            type: Schema.Types.ObjectId,
            ref:'Faculty'
        }],
        CreateAt: {
            type: Date,
            default: Date.now()
        },
        UpdateAt: {
            type: Date,
            default: Date.now()
        }
    },
);
UserSchema.plugin(AutoIncrement, {inc_field: 'userID'})
const User = mongoose.model('User', UserSchema);
module.exports = User;