import { Schema, model } from "mongoose";

const stationSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    latitude: {
        required: true,
        type: String,
        trim: true
    },
    longitude: {
        required: true,
        type: String,
        trim: true
    },
    type: {
        required: true,
        type: String,
        trim: true
    },
    status: {
        required: true,
        type: Boolean,
        trim: true
    },
    location_notes: {
        required: true,
        type: String,
        trim: true
    },
    gateway_id: {
        required: true,
        type: String,
        trim: true
    },
    company_id: {
        required: true,
        type: String,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Station', stationSchema);
