import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      UserAdd:
 *          type: object
 *          properties:
 *              name: 
 *                  type: string
 *                  description: Nombre del usuario 
 *              email: 
 *                  type: string
 *                  description: Email del usuario 
 *              id_company: 
 *                  type: string
 *                  description: Id de la compañia asociada al usuario
 *              roles: 
 *                  type: Array
 *                  decription: Roles asignados al usuario dentro del sistema
 *          required:
 *              - name
 *              - email
 *              - id_company
 *              - roles
 *          example:
 *              {
 *                  name: Pedro Fabián León Tigre, 
 *                  email: pedrito123@gmail.com, 
 *                  id_company: 61f0eace3e60ea8911111729,
 *                  roles: [user, admin] 
 *              }
 *                    
 *      Token: 
 *          type: string
 *          description: token generado a partir del id del usuario
 *          example:
 *              token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCY8.eyJfaWQiOiI2MWUwY2NhYjhlNzVmZDczOGMwMTlhZjgiLCJpYXQiOjE2NDIxOTA5MjQsImV4cCI6MTY0MjE5MTUyNH0.JQoqK8mZXSLY7XrcSP08lc7xx4pFNTxaaVLLyMDe2zc
 *                   
 * 
 * */



/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: Agrega un usuario al sistema
 *      tags: [User]
 *      requestBody:
 *          requiered: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserAdd'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Error de datos inválidos
 *          301: 
 *              description: Error de usuario ya existente
 *          404:
 *              description: Error de inexistencia de la compañia ingresada
 */
router.post( '/user/signup', userCtrl.signUp );

// Iniciar sesión
router.post( '/user/signin', userCtrl.signIn );

// Mostrar un usuario

// Modificar un usuario

// Eliminar un usuario

// Recuperar contraseña
router.post('/user/forgotPassword', userCtrl.forgotPassword );

// Reiniciar o crear contraseña
router.put('/user/resetPassword/:token', userCtrl.newPassword );

//Ruta de prueba passport (para probar el acceso via token)
router.get('/special', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Succes');
});

export default router;
