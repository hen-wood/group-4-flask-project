const LOAD_SERVERS = "/servers/LOAD";
const CREATE_SERVER = "/server/ADD";
const DELETE_SERVER_FROM_LIST = "/serverlist/DELETE";



export const thunkGetUserServers = () => async dispatch => {
	console.log('in it right now')
	const response = await fetch("/api/servers/");
	console.log(response)
	if (response.ok) {
		const servers = await response.json();
		dispatch(loadServers(servers));
	}
};

const loadServers = servers => {
	return { type: LOAD_SERVERS, servers };
};

const createServer = servers => {
	return { type: CREATE_SERVER, servers };
};

export const deleteServerFromList = server => {
	console.log(server, ' in actions store for delete server from list')
	return {type: DELETE_SERVER_FROM_LIST, server}
}

export const createServerThunk = payload => async dispatch => {
	const response = await fetch(`/api/servers/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createServer(data));
	}
};



const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_SERVERS:
			const newState = { ...state };
			action.servers.forEach(server => {
				newState[server.id] = server;
			});
			return { ...newState };
		case CREATE_SERVER:
			const newServerState = { ...state };
			newServerState[action.servers.id] = action.servers;
			return newServerState;
		case DELETE_SERVER_FROM_LIST:
			console.log('in delete server reducer')
			const deleteState = { ...state };
			delete deleteState[action.server];
			return deleteState;
		default:
			return state;
	}
}
