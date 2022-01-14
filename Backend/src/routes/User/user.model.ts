import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
        name: string;
        email: string;
        password: string;
        id_company: any;
        roles: any;
        resetToken: string;
        encryptPassword(password: string): Promise<string>;
        comparePassword(password: string): Promise<boolean>;
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
        required: false,
        type: String,
        trim: true
    },
    id_company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    resetToken: {
        type: String,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true   
});

/**
 * Funcion que se encarga de encriptar la password
 * @param password contraseña del usuario
 * @returns la password del usuario encriptada
 */
 userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
  
  /**
   * Compara la password ingresada por el usuario y la valida
   * @param password password del usuario
   * @returns devuelve un true/false de la comparación entre passwords
   */
  userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
  };

export default model< IUser >('User', userSchema);
