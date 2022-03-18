import { config } from "dotenv";
import Role from "../models/role.model";
import configVar from "../config/config";

/** 
 * Se encarga de crear los roles de usuarios en la BD. Verificando la existencia de ellos apenas arranca el software.
 */
export const createRoles = async () => {

    try {
        // Cuenta los documentos existentes de roles
        const count = await Role.estimatedDocumentCount();

        // Verifica si existe alguno
        if (count > 0) return;

        // Crea los roles por default
        const values = await Promise.all([
        new Role({ name: configVar.USER }).save(),
        new Role({ name: configVar.ADMIN }).save(),
        new Role({ name: configVar.SUPER_ADMIN }).save()
        ]);

    } catch (error) {
        console.log(error);
    }
};
