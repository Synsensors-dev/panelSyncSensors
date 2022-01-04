import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from '../config/config';
import User from '../routes/User/user.model'

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

/** 
 * Se encarga de validar el _id que viene dentro del token con los ids registrados en la BD.
 * @returns null para el error, user (si existe) || null (si no existe)
 */
export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if ( user ){
            return done(null, user);
        }
        return done(null,false);

    } catch (error) {
        console.log(error);
    }
});
