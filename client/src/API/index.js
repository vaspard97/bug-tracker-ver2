import axios from "axios";

const URL = axios.create({
	baseURL: "https://bug-tracker-ver2.herokuapp.com//",
});
URL.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${JSON.parse(
			localStorage.getItem("profile")
		)}`;
	}

	return req;
});

export const getCurrentUser = () => URL.get(`auth/showMe`);
export const getAllUser = () => URL.get(`posts/users`);

/*Aut API */
export const createUser = (formData, navigate) =>
	URL.post(`auth/signup`, formData);
export const signInUser = (formData, navigate) =>
	URL.post(`auth/signin`, formData);
export const signInDemo = (navigate) => URL.get(`auth/signin/demo`);
export const signInDemoDev = (navigate) => URL.get(`auth/signin/demo2`);
export const signOutUser = (navigate) => URL.delete(`auth/signOut`);
export const verifyUser = (verificationData) =>
	URL.post(`auth/verify-email`, verificationData);

/*Project API */
export const getProjects = () => URL.get(`posts/projects`);
export const createProjects = (formData) =>
	URL.post(`posts/projects`, formData);
export const getOneProject = (id, formData) =>
	URL.get(`posts/projects/${id}`, formData);
export const updateProject = (id, formData) =>
	URL.patch(`posts/projects/${id}`, formData);
export const deleteProject = (id) => URL.delete(`posts/projects/${id}`);

/*TicketAPI */
export const createTicket = (projectid, formData) =>
	URL.post(`posts/projects/${projectid}/ticket`, formData);
export const getTickets = (projectid) =>
	URL.get(`posts/projects/${projectid}/ticket`);
export const getMyTickets = () => URL.get(`posts/myticket`);
export const updateMyTickets = (ticketId, formData) =>
	URL.patch(`posts/myticket/${ticketId}`, formData);
