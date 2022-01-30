import * as api from "../../API";

export const getAllTicket = (projectid) => async (dispatch) => {
	dispatch({ type: "GET_ALL_TICKET" });
	try {
		const { data } = await api.getTickets(projectid);
		dispatch({ type: "GET_ALL_TICKET_SUCCESS", payload: data });
	} catch (error) {
		if (error.response.status === 401) {
			dispatch({ type: "AUTHENTICATION_ERROR" });
		}
		dispatch({ type: "GET_ALL_TICKET_ERROR" });
		console.log(error);
	}
};

export const createTicket = (projectid, formData) => async (dispatch) => {
	dispatch({ type: "CREATE_TICKET" });

	try {
		const { data } = await api.createTicket(projectid, formData);

		dispatch({ type: "CREATE_TICKET_SUCCESS", payload: data.result });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_TICKET_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error.response.data.message);
		setTimeout(() => {
			dispatch({
				type: "CLEAR_TICKET_SUCCESS",
			});
		}, 3000);
	}
};

export const getAllMyTickets = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_MY_TICKET" });
	try {
		const { data } = await api.getMyTickets();
		dispatch({ type: "GET_ALL_MY_TICKET_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_UPDATE_MY_TICKET_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		if (error.response.status === 401) {
			dispatch({ type: "AUTHENTICATION_ERROR" });
		}
		dispatch({ type: "GET_ALL_MY_TICKET_ERROR" });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_UPDATE_MY_TICKET_SUCCESS",
			});
		}, 3000);
		console.log(error);
	}
};

export const updateMyTicket = (ticketId, formData) => async (dispatch) => {
	dispatch({ type: "UPDATE_MY_TICKET" });
	try {
		const { data } = await api.updateMyTickets(ticketId, formData);
		dispatch({ type: "UPDATE_MY_TICKET_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_UPDATE_MY_TICKET_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		dispatch({ type: "UPDATE_MY_TICKET_ERROR" });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_UPDATE_MY_TICKET_SUCCESS",
			});
		}, 3000);
		console.log(error);
	}
};
