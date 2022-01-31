import express, { Router } from "express";
import {
	signUp,
	signIn,
	signOut,
	verifyEmail,
	showCurrentUser,
	signInDemo,
	signInDemoDev,
} from "../controller/auth.js";
import {
	authenticateUser,
	authorizedPermission,
} from "../middleware/authentication.js";

const route = express.Router();

route.get("/showMe", authenticateUser, showCurrentUser);
route.get("/signin/demo", signInDemo);
route.get("/signin/demo2", signInDemoDev);
route.post("/signin", signIn);
route.post("/signup", signUp);
route.delete("/signout", authenticateUser, signOut);
route.post("/verify-email", verifyEmail);

export default route;
