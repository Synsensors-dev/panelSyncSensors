import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';

const router = Router();

// Agregar nuevo usuario
router.post( '/user/signup', userCtrl.signUp );

// Iniciar sesión
router.post( '/user/signin', userCtrl.signIn );

// Mostrar un usuario
router.get('/user/:id', userCtrl.readUser);

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
