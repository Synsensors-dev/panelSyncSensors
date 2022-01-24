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
        default: -100
    },
    max_config: {
        type: Number,
        default: 100
    },
    status: {
        type: Boolean,
        default: false
    },
    alert_time: {
        type: Date,
        default: Date.prototype.setMinutes(30)
    },
    last_alert: {
        type: Date,
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

export default model('Sensor', sensorSchema);
