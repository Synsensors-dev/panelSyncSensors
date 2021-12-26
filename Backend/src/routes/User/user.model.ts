import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true, 
        type: String,
        trim: true
    },
    password: {
        required: true,
        type: String,
        trim: true
    },
    id_company: {
        required: true, 
        type: String,
        trim: true
    },
    permission_level: {
        required: true,
        type: Number,
        trim: true
    },
},{
    versionKey: false,
    timestamps: true   
});

export default model('User', userSchema);
