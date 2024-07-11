import { Schema, model } from 'mongoose'

const jobSchema = new Schema({
    originalId: {
        type: Number,
        required: true,
        unique: true
    },
    title: String,
    url: String,
    text: {
        type: String,
        default: ""
    },
    time: Number
}, { timestamps: true })

const Job = model('Job', jobSchema)

export default Job
