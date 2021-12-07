import { Schema, model } from "mongoose";

const companySchema = new Schema({




},{
    versionKey: false,
    timestamps: true
});

export default model('Company', companySchema);