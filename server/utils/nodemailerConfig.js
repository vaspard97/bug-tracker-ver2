import dotenv from "dotenv";
dotenv.config();
export default {
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
};
