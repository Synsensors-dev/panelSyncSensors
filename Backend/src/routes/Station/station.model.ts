import { Schema, model } from "mongoose";

const stationSchema = new Schema({




},{
    versionKey: false,
    timestamps: true
});

export default model('Station', stationSchema);