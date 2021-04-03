const mongoose = require('mongoose');

const Schema = mongoose.Schema;
AutoIncrement = require('mongoose-sequence')(mongoose);

const facultySchema = new Schema(
    {
        facultyID: { type: Number },
        facultyName: { type: String, require: true, unique: true },
        startDay: { type: Date, require: true },
        endDay: { type: Date, require: true },
        report: [{
            reportID: {
                type: Schema.Types.ObjectId,
                ref: 'Report',
            }
        }],
        student:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        coordinator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
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
// facultySchema.plugin(AutoIncrement, { inc_field: 'facultyID' })
const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;