import UserModels from "../models/user.js";
import { TokenModel } from "../models/token.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { createJWT } from "../utils/index.js";

dotenv.config();

export const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		const existingUser = await UserModels.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User Already Exist", success: false });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const verificationToken = crypto.randomBytes(40).toString("hex");

		const user = await UserModels.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			verificationToken,
		});

		await sendVerificationEmail({
			name: user.firstName,
			email: user.email,
			verificationToken: user.verificationToken,
		});

		//send verification token only when testing in postman!!!
		//exclude toke for in production
		return res.status(200).json({
			message: "Sucess ! Please check your email",
			verificationToken: user.verificationToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something Went Wrong" });
	}
};

//used for a link on front end
export const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body;

	try {
		const user = await UserModels.findOne({ email });
		if (!user)
			return res
				.status(404)
				.json({ message: "User Not Found", success: false });

		if (user.verificationToken !== verificationToken)
			return res
				.status(401)
				.json({ message: "Verification Failed", success: false });

		(user.isVerified = true),
			(user.verified = Date.now()),
			(user.verificationToken = "");
		await user.save();
		return res.status(200).json({ message: "Email Verified", success: true });
	} catch (error) {
		res.status(500).json({ message: "Something Went Wrong", success: false });
	}
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res
			.status(400)
			.json({ message: "Please Provide Email And Password", sucess: false });

	try {
		const existingUser = await UserModels.findOne({ email }).select(
			"-verified -verificationToken"
		);
		if (!existingUser) {
			return res
				.status(404)
				.json({ message: "User Does Not Exist", success: false });
		}

		const comparePassword = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!comparePassword) {
			return res
				.status(400)
				.json({ message: "Invalid Credentials", success: false });
		}

		if (!existingUser.isVerified) {
			return res
				.status(401)
				.json({ message: "Please Verify Your email", success: false });
		}

		const tokenUser = {
			fullName: `${existingUser.firstName} ${existingUser.lastName}`,
			email: existingUser.email,
			id: existingUser._id,
			roles: existingUser.roles,
		};

		let accessToken = createJWT({ payload: tokenUser, expires: "1h" });
		return res.status(200).json({ tokenUser, accessToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something Went Wrong" });
	}
};

export const signOut = async (req, res) => {
	await TokenModel.findOneAndDelete({ user: req.user.id });

	res.cookie("accessToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.cookie("refreshToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	return res.status(200).json({ message: "User Logged Out" });
};

export const showCurrentUser = async (req, res) => {
	try {
		if (req?.user.id) {
			const currentUser = await UserModels.findById(req.user.id).select(
				"-password -verified -verificationToken"
			);
			return res.status(200).json(currentUser);
		}
	} catch (error) {
		return res.status(404).json({ user: null, success: false });
	}
};
