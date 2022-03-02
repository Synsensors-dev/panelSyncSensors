import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';

const router = Router();

/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: Agregar un usuario al sistema
 *      tags: [User]
 *      requestBody:
 *          requiered: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      name: 
 *                          type: string
 *                          description: Nombre del usuario 
 *                      email: 
 *                          type: string
 *                          description: Email del usuario 
 *                      id_company: 
 *                          type: string
 *                          description: Id de la compañia asociada al usuario
 *                      roles: 
 *                          type: Array
 *                          decription: Roles asignados al usuario dentro del sistema
 *                  required:
 *                      - name
 *                      - email
 *                      - id_company
 *                      - roles
 *                  example:
 *                      {
 *                          name: Pedro Fabián León Tigre, 
 *                          email: pedrito123@gmail.com, 
 *                          id_company: 61f0eace3e60ea8911111729,
 *                          roles: [user, admin] 
 *                      }
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Error de datos inválidos
 *          301: 
 *              description: Error de dato existente
 *          404:
 *              description: Error de inexistencia 
 */
router.post( '/user/signup', userCtrl.signUp );

/**
 * @swagger
 * /user/signin:
 *  post:
 *      summary: Inicio de sesión de un usuario
 *      tags: [User]
 *      requestBody:
 *          requiered: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      email: 
 *                          type: string
 *                          description: Email del usuario 
 *                      password: 
 *                          type: string
 *                          description: Password del usuario
 *                  required:
 *                      - email
 *                      - password
 *                  example:
 *                      {
 *                          email: pedrito123@gmail.com, 
 *                          password: 123Contraseña
 *                      }
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Error de datos inválidos
 *          404:
 *              description: Error de inexistencia 
 */
router.post( '/user/signin', userCtrl.signIn );

/**
 * @swagger
 * /user/forgotPassword:
 *  post:
 *      summary: Recuperar contraseña
 *      tags: [User]
 *      requestBody:
 *          requiered: true
 *          content:
 *              application/json:
 *                  schema:
 *                      email: string
 *                  required: true
 *                  description: email del usuario
 *                  example: 
 *                      {
 *                          email: benja-98@hotmail.es
 *                      }
 *      responses:
 *          400:
 *              description: Error de datos inválidos
 *          404:
 *              description: Error de inexistencia
 *          200:
 *              description: Success
 */
router.post('/user/forgotPassword', userCtrl.forgotPassword );

/**
 * @swagger
 * /user/resetPassword/{token}:
 *  put:
 *      summary: Reiniciar contraseña
 *      tags: [User]
 *      parameters:
 *          in: path
 *          name: token
 *          schema:
 *              type: string
 *          required: true
 *          description: token generado por el id user
 *      requestBody:
 *          requiered: true
 *          content:
 *              application/json:
 *                  schema:
 *                      password: string
 *                  required: true
 *                  description: password del usuario
 *                  example: 
 *                      {
 *                          password: contraseña1234
 *                      }
 *      responses:
 *          400:
 *              description: Error de datos inválidos
 *          404:
 *              description: Error de inexistencia
 *          200:
 *              description: Success
 */
router.put('/user/resetPassword/:token', userCtrl.newPassword );

//Ruta de prueba passport (para probar el acceso via token)
router.get('/special', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Succes');
});

export default router;
