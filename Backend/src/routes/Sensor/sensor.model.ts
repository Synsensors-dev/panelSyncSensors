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
        type: Number
    },
    min_config: {
        type: Number
    },
    max_config: {
        type: Number
    },
    status: {
        type: Boolean
    },
    id_station: {
        type: Schema.Types.ObjectId,
        ref: "Station"
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Sensor', sensorSchema);
