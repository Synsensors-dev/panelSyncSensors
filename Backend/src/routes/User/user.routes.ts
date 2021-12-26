import { Router } from "express";
import * as userCtrl from './user.controller';

const router = Router();

// Agregar nuevo usuario
router.post( 'user/signup', userCtrl.signUp );

// Iniciar sesión
router.post( 'user/signin', userCtrl.signIn );

// Mostrar un usuario

// Modificar un usuario

// Eliminar un usuario

export default router;
