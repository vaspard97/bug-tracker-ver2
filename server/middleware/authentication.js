import { isTokenValid } from "../utils/index.js";
import dotenv from "dotenv";

dotenv.config();

//same as verify jwt
export const authenticateUser = async (req, res, next) => {
	try {
		let authHeader = req.headers.authorization;
		const token = authHeader.split(" ")[1];
		console.log("authenticate user");
		let result = isTokenValid(token);
		req.user = { id: result.id, roles: result.roles };
		console.log("token is Valid");
		return next();
	} catch (error) {
		console.log("middleware unauthorized");
		return res.status(401).json({ message: "Unauthorized" });
	}
};

//same as verifyRoles
export const authorizedPermission = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.user.roles) {
			console.log("No req.user.roles");
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (!allowedRoles.includes(req.user.roles)) {
			console.log(req.user.roles);
			console.log("Unauthorized role");
			return res.status(401).json({ message: "Unauthorized" });
		}

		next();
	};
};
