import Role from "../models/role.model";

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
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
        new Role({ name: "super_admin" }).save()
        ]);

    } catch (error) {
        console.log(error);
    }
};
