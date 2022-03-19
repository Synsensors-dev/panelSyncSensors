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
        type: Number, //minutos
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
        type: Number,
        default: 30 //30 minutos
    },
    last_alert: {
        type: Date,
        default: null
    },
    quantity_readings: {
        type: Number,
        default: 0
    },
    custom_alert: {
        type: Boolean,
        default: false
    },
    token_reading: {
        type: String,
        default: null,
        trim: true
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
