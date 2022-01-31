import express from "express";
import {
	createProject,
	getOneProject,
	getProjects,
	updateProject,
	deleteProject,
	getUsers,
} from "../controller/project.js";
import {
	createTicket,
	getTickets,
	getOneTicket,
	updateTicket,
	deleteTicket,
	getUpdatableTickets,
} from "../controller/tickets.js";

import {
	authenticateUser,
	authorizedPermission,
} from "../middleware/authentication.js";

const route = express.Router();

route.get("/users", authenticateUser, getUsers);
route.get("/projects/:id", authenticateUser, getOneProject); //all team members
route.get("/projects", authenticateUser, getProjects); //all team member
route.post(
	"/projects",
	authenticateUser,
	authorizedPermission("team lead", "admin"),
	createProject
); //only team lead
route.patch(
	"/projects/:id",
	authenticateUser,
	authorizedPermission("team lead", "admin"),
	updateProject
); //only team lead
route.delete(
	"/projects/:id",
	authenticateUser,
	authorizedPermission("team lead", "admin"),
	deleteProject
); //only team lead

route.post("/projects/:projectid/ticket", authenticateUser, createTicket);
route.get("/projects/:projectid/ticket", authenticateUser, getTickets);

route.get("/myticket", authenticateUser, getUpdatableTickets);
route.patch("/myticket/:ticketid", authenticateUser, updateTicket);
export default route;
