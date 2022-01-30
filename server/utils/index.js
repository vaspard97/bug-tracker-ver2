import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createJWT = ({ payload, expires }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: expires,
	});
	console.log("Create Token");
	return token;
};

export const isTokenValid = (token) => {
	console.log("Validate Token");
	return jwt.verify(token, process.env.JWT_SECRET);
};
