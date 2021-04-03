const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reportSchema = new Schema(
    {
        facultyID: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            require: true
        },
        reportUrl: {
            type: String,
            require: true
        },
        point: {
            type: Number
        },
        feedback:{
            type: String
        },
        public: {
            type: Boolean,
            default: false
        },
        reportStatus: {
            type: String,
            require: true
        },
        CreateAt: {
            type: Date,
            default: Date.now()
        },
        UpdateAt: {
            type: Date,
            default: Date.now()
        }
    })

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;