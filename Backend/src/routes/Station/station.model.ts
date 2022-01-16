import { Schema, model } from "mongoose";

const stationSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    latitude: {
        required: false,
        type: String,
        trim: true
    },
    longitude: {
        required: false,
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
    id_gateway: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Gateway"
    },
    id_company: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Station', stationSchema);
