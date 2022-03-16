import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import User from "../routes/User/user.model";

 export const isAdmin: RequestHandler = async (req, res, next) => {

	if (!req.headers.authorization)
		return res.status(400).send({ success: false, message: 'Headers dont have authorization param' });

	const token = req.headers.authorization.split(' ')[1];

	if (!token)
		return res.status(400).send({ success: false, message: 'Bad syntax header authorization' });

	const payload: any = jwt.verify(token, config.jwtSecret);

	const _id = payload._id;

    const user = await User.findById( _id );


	next();
} 