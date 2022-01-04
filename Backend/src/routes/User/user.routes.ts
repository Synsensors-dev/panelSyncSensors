import { Router } from "express";
import * as userCtrl from './user.controller';
import passport from 'passport';

const router = Router();

// Agregar nuevo usuario
router.post( '/user/signup', userCtrl.signUp );

// Iniciar sesión
router.post( '/user/signin', userCtrl.signIn );

// Mostrar un usuario

// Modificar un usuario

// Eliminar un usuario


//Ruta de prueba passport (para probar el acceso via token)
router.get('/special', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Succes');
});

export default router;
