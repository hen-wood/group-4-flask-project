// constants
const SET_USER_DIRECT_CHANNELS = "directChannels/SET_USER_DIRECT_CHANNELS";
const SET_SINGLE_USER_DIRECT_CHANNEL =
	"directChannels/SET_SINGLE_USER_DIRECT_CHANNEL";

// Action Creators
/*
[{'id': 1, 'user_one': {'id': 1, 'username': 'Demo'}, 'user_two': {'id': 1, 'username': 'marnie'}}]
*/
const actionSetUserDirectChannels = userDirectChannels => {
	const channelsObj = {};
	userDirectChannels.forEach(channel => (channelsObj[channel["id"]] = channel));
	return {
		type: SET_USER_DIRECT_CHANNELS,
		payload: channelsObj
	};
};

const actionSetSingleUserDirectChannel = userDirectChannel => {
	return {
		type: SET_SINGLE_USER_DIRECT_CHANNEL,
		payload: userDirectChannel
	};
};

// Thunks

export const thunkGetUserDirectChannels = () => async dispatch => {
	const response = await fetch("/api/directchannels/current");
	if (response.ok) {
		const data = await response.json();
		dispatch(actionSetUserDirectChannels(data));
	}
};

export const thunkGetUserSingleDirectChannel =
	directChannelId => async dispatch => {
		const response = await fetch(`api/directchannels/${directChannelId}`);
		if (response.ok) {
			const data = await response.json();
			dispatch(actionSetSingleUserDirectChannel(data));
		}
	};

const initialState = {
	allUserDirectChannels: {},
	singleUserDirectChannel: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_DIRECT_CHANNELS:
			return { userDirectChannels: action.payload };
		case SET_SINGLE_USER_DIRECT_CHANNEL:
			return { singleUserDirectChannel: action.payload };
		default:
			return state;
	}
}
