import { Schema, model } from "mongoose";

const stationSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    type: {
        required: true,
        type: String,
        trim: true
    },
    readings_station: {
        type: Boolean,
        default: false
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
