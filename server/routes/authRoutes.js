import express, { Router } from "express";
import {
	signUp,
	signIn,
	signOut,
	verifyEmail,
	showCurrentUser,
} from "../controller/auth.js";
import {
	authenticateUser,
	authorizedPermission,
} from "../middleware/authentication.js";

const route = express.Router();

route.get(
	"/showMe",
	authenticateUser,
	authorizedPermission("admin"),
	showCurrentUser
);
route.post("/signin", signIn);
route.post("/signup", signUp);
route.delete("/signout", authenticateUser, signOut);
route.post("/verify-email", verifyEmail);

export default route;
