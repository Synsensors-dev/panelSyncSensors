import { Schema, model } from "mongoose";

const alertSchema = new Schema({
    value: {
        required: true,
        type: Number
    },
    id_reading: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Reading"
    },
    id_sensor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Sensor"
    },
    type_sensor: {
        type: String,
        default: null
    },
    id_station: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Station"
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

export default model('Alert', alertSchema);
