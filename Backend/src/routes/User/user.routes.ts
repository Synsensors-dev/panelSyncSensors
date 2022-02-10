import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  description: usuario registrado en el sistema
 *              token:
 *                  type: string
 *                  description: token generado a partir del id del usuario
 *          example:
 *              user: { 
 *                      _id: 61f0eace3e60ea8911111729 , 
 *                      name: Pedro Fabián León Tigre, 
 *                      email: pedrito123@gmail.com, 
 *                      id_company: 61f0eace3e60ea8911111729,
 *                      roles: [Administrador, Moderador, Usuario] 
 *                     }
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCY8.eyJfaWQiOiI2MWUwY2NhYjhlNzVmZDczOGMwMTlhZjgiLCJpYXQiOjE2NDIxOTA5MjQsImV4cCI6MTY0MjE5MTUyNH0.JQoqK8mZXSLY7XrcSP08lc7xx4pFNTxaaVLLyMDe2zc
 */



/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: Agrega un usuario al sistema
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Error de datos inválidos
 *          301: 
 *              description: Error de usuario ya existente
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
