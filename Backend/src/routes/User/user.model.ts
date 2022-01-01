import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
        name: string;
        email: string;
        password: string;
        id_company: string;
        permission_level: number;
        comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true, 
        type: String,
        trim: true,
        unique: true, 
        lowercase: true
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

//cifrar contraseña
userSchema.pre< IUser >( 'save', async function (next) {
    const user = this;
    if ( !user.isModified('password') ) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash( user.password, salt );
    user.password = hash;
    next();
});

//comparar contraseñas encriptadas
userSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
    return await bcrypt.compare( password, this.password );
}

export default model< IUser >('User', userSchema);
