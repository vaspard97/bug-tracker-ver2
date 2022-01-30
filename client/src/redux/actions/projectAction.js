import * as api from "../../API";

export const getProjects = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_PROJECTS" });
	try {
		const { data } = await api.getProjects();
		dispatch({ type: "GET_ALL_PROJECTS_SUCCESS", payload: data });
	} catch (error) {
		console.log(error);
		if (error.response.status === 401) {
			dispatch({ type: "AUTHENTICATION_ERROR" });
		}
		dispatch({ type: "GET_ALL_PROJECTS_ERROR" });
	}
};

export const createProject = (formData) => async (dispatch) => {
	dispatch({ type: "CREATE_PROJECTS" });
	try {
		const { data } = await api.createProjects(formData);
		dispatch({ type: "CREATE_PROJECT_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error);
		dispatch({
			type: "CREATE_PROJECT_ERROR",
		});
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	}
};

export const updateProject = (id, formData) => async (dispatch) => {
	dispatch({ type: "UPDATE_PROJECT" });
	try {
		const { data } = await api.updateProject(id, formData);
		dispatch({ type: "UPDATE_PROJECT_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error);
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	}
};

export const deleteProject = (id) => async (dispatch) => {
	dispatch({ type: "DELETE_PROJECT" });
	try {
		await api.deleteProject(id);
		dispatch({ type: "DELETE_PROJECT_SUCCESS", payload: id });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error);
		dispatch({
			type: "DELETE_PROJECT_ERROR",
		});
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	}
};
