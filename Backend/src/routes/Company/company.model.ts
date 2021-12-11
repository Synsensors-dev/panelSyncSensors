import { Schema, model } from "mongoose";

const companySchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    address: {
        required: true,
        type: String,
        trim: true
    },
    representative_name: {
        required: true,
        type: String,
        trim: true
    },
    creation_date: {
        required: true,
        type: Date,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Company', companySchema);
