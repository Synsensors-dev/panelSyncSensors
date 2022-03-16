import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';
import { isAdmin } from "../../middlewares/authRoles";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    ObjectReturn: 
 *      type: object
 *      properties:
 *          success:
 *              type: boolean
 *              description: variable true o false dependiendo el return
 *          data:
 *              type: object
 *              description: objecto vacío o con valores dependiendo el return
 *          message: 
 *              type: string
 *              description: mensaje del return
 *      required:
 *          - success
 *          - data
 *          - message
 *      example:
 *          success: true
 *          data: {}
 *          message: mensaje de la ejecución
 * 
 *  parameters:
 *      token:
 *          in: path
 *          name: token
 *          required: true
 *          schema:
 *              type: string
 *              description: token generado para recuperar la contraseña
 *      idCompany:
 *          in: path
 *          name: id_company
 *          required: true
 *          schema: 
 *              type: string
 *              description: id de la compañia a la cual están asociado el o los usuarios
 */

/**
 * @swagger
 * tags: 
 *  name: User
 *  description: User Endpoints
 */

/**
 * @swagger
 * /user/signup:
 *  post:
 *    summary: Agregar un usuario al sistema
 *    tags: [User]
 *    requestBody:
 *        requiered: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        name: 
 *                            type: string
 *                            description: Nombre del usuario 
 *                        email: 
 *                            type: string
 *                            description: Email del usuario 
 *                        id_company: 
 *                            type: string
 *                            description: Id de la compañia asociada al usuario
 *                        roles: 
 *                            type: Array
 *                            decription: Roles asignados al usuario dentro del sistema
 *                    required:
 *                        - name
 *                        - email
 *                        - id_company
 *                        - roles
 *                    example:
 *                        name: Pedro Fabián León Tigre 
 *                        email: pedrito123@gmail.com 
 *                        id_company: 61f0eace3e60ea8911111729
 *                        roles: [user, admin] 
 *    responses:
 *      201:
 *        description: Se ha creado correctamente el nuevo usuario.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia ingresada no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: datos inválidos. O, El id_company ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      301:
 *        description: el usuario ingresado ya existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'    
 */
router.post( '/user/signup', isAdmin, userCtrl.signUp );

/**
 * @swagger
 * /user/signin:
 *  post:
 *    summary: Iniciar sesión de un usuario
 *    tags: [User]
 *    requestBody:
 *        requiered: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        email: 
 *                            type: string
 *                            description: Email del usuario 
 *                        password: 
 *                            type: string
 *                            description: Clave del usuario
 *                    required:
 *                        - email
 *                        - password
 *                    example:
 *                        email: pedrito123@gmail.com 
 *                        password: 61f0eace3e6
 *    responses:
 *      200:
 *        description: Inicio de sesión exitoso.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: el usuario ingresado no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: La contraseña es incorrecta. O, datos inválidos
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'   
 */
router.post( '/user/signin', userCtrl.signIn );

/**
 * @swagger
 * /user/forgotPassword:
 *  post:
 *    summary: Recuperar contraseña
 *    tags: [User]
 *    requestBody:
 *        requiered: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        email: 
 *                            type: string
 *                            description: Email del usuario 
 *                    required:
 *                        - email
 *                    example:
 *                        email: pedrito123@gmail.com
 *    responses:
 *      200:
 *        description: Se envió un correo al usuario de manera exitosa.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: el usuario ingresado no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: no se ingresó ningún email.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'   
 */
router.post('/user/forgotPassword', userCtrl.forgotPassword );

/**
 * @swagger
 * /user/resetPassword/{token}:
 *  put:
 *    summary: Reiniciar contraseña
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/token'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      password:
 *                          type: string
 *                          description: clave del usuario
 *                  required:
 *                      - password
 *                  example:
 *                      password: 123contraseña
 *    responses:
 *      200:
 *        description: Contraseña actualizada con exito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: No se a ingresado ningún token. 0, el usuario ingresado no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: Token incorrecto o expirado
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.put('/user/resetPassword/:token', userCtrl.newPassword );

/**
 * @swagger
 * /users/{id_company}:
 *  get:
 *    summary: Obtener una lista de usuarios con (nombre, rol y status) asociados a una compañia -> status aún no definido
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Usuarios encontrados con exito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia ingresada no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: El id ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.get('/users/:id_company', userCtrl.usersList);

/**
 * @swagger
 * /user/{token}:
 *  get:
 *    summary: Obtener un usuario a partir de un token de inicio de sesión
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: Usario encontrado con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El usuario ingresado no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: Token incorrecto o expirado
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.get('/user/:token', userCtrl.readUser);

//Ruta de prueba passport (para probar el acceso via token)
router.get('/special', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Succes');
});

export default router;
