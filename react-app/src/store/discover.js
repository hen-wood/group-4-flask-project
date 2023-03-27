const LOAD_ALL_SERVERS = "discover/LOAD_ALL_SERVERS";

const actionLoadServers = servers => {
	const other = {};
	const gaming = {};
	const artistsCreators = {};
	const education = {};
	const scienceTech = {};
	const entertainment = {};
	const localCommunity = {};
	servers.forEach(server => {
		other[server.id] = server;
		if (server.category === "Gaming") {
			gaming[server.id] = server;
		}
		if (server.category === "Education") {
			education[server.id] = server;
		}
		if (server.category === "Entertainment") {
			entertainment[server.id] = server;
		}
		if (server.category === "Artists & Creators") {
			artistsCreators[server.id] = server;
		}
		if (server.category === "Science & Tech") {
			scienceTech[server.id] = server;
		}
		if (server.category === "Local Community") {
			localCommunity[server.id] = server;
		}
	});
	return {
		type: LOAD_ALL_SERVERS,
		payload: {
			other,
			gaming,
			artistsCreators,
			education,
			scienceTech,
			entertainment,
			localCommunity
		}
	};
};

export const thunkGetAllServers = () => async dispatch => {
	const res = await fetch("/api/servers/discover");
	if (res.ok) {
		const data = await res.json();
		dispatch(actionLoadServers(data));
	} else {
		const error = await res.json();
		console.log(error);
	}
};

const initialState = {
	other: {},
	gaming: {},
	artistsCreators: {},
	education: {},
	scienceTech: {},
	entertainment: {},
	localCommunity: {}
};

const discoverReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_ALL_SERVERS:
			newState = { ...state, ...action.payload };
			return newState;
		default:
			return state;
	}
};

export default discoverReducer;
