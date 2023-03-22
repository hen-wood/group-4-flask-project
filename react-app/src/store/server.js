import { deleteServerFromList } from "./servers";
import { thunkGetUserServers } from "./servers";

const LOAD_SERVER = "/server/LOAD";
const DELETE_SERVER = "/server/DELETE";
const EDIT_SERVER = "/server/UPDATE";
export const thunkGetServer = id => async dispatch => {
	const response = await fetch(`/api/servers/${id}`);
	if (response.ok) {
		const server = await response.json();
		dispatch(loadServer(server));
	}
};

export const editServerThunk = (name, id) => async dispatch => {
	const response = await fetch(`/api/servers/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name })
	});
	if (response.ok) {
		dispatch(thunkGetUserServers());
		dispatch(editServer(name, id));
	}
};

const editServer = (name, id) => {
	return {
		type: EDIT_SERVER,
		payload: { name, id }
	};
};

export const deleteServerThunk = id => async dispatch => {
	const response = await fetch(`/api/servers/${id}`, {
		method: "DELETE"
	});
	if (response.ok) {
		dispatch(deleteServerFromList(id));
		const data = await response.json();
		dispatch(deleteServer(data));
	}
};

const loadServer = server => {
	return { type: LOAD_SERVER, server };
};

const deleteServer = server => {
	return {
		type: DELETE_SERVER,
		server
	};
};

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_SERVER:
			const loadServerState = { ...action.server };
			return loadServerState;
		case DELETE_SERVER:
			const deleteState = {};
			return deleteState;
		case EDIT_SERVER:
			const editState = { ...state };
			console.log(action.payload);
			console.log(editState);
			editState.name = action.payload.name;
			return editState;
		default:
			return state;
	}
}
