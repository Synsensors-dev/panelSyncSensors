import { Schema, model } from "mongoose";

const readingSchema = new Schema({
    value: {
        required: true,
        type: Number
    },
    id_sensor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Sensor"
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

export default model('Reading', readingSchema);
