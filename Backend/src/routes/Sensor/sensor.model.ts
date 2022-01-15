import { Schema, model } from "mongoose";

const sensorSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    type: {
        required: true,
        type: String,
        trim: true
    },
    frecuency: {
        type: Number,
        default: null
    },
    min_config: {
        type: Number,
        default: -10^4
    },
    max_config: {
        type: Number,
        default: 10^4
    },
    status: {
        type: Boolean,
        default: false
    },
    id_station: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Station"
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Sensor', sensorSchema);
