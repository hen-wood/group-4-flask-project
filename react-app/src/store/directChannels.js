// constants
const SET_USER_DIRECT_CHANNELS = "directChannels/SET_USER_DIRECT_CHANNELS";
const SET_SINGLE_USER_DIRECT_CHANNEL =
	"directChannels/SET_SINGLE_USER_DIRECT_CHANNEL";
const ADD_DIRECT_CHANNEL_MESSAGE = "directChannels/ADD_DIRECT_CHANNEL_MESSAGE";
const CLEAR_SINGLE_DIRECT_CHANNEL =
	"directChannels/CLEAR_SINGLE_DIRECT_CHANNEL";
const CLEAR_ALL = "directChannels/CLEAR_ALL";

// Action Creators

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

export const actionAddDirectChannelMessage = message => {
	return {
		type: ADD_DIRECT_CHANNEL_MESSAGE,
		payload: message
	};
};

export const actionClearSingleUserDirectChannel = () => {
	return {
		type: CLEAR_SINGLE_DIRECT_CHANNEL
	};
};

export const actionClearAllDirectChannels = () => {
	return {
		type: CLEAR_ALL
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
		const response = await fetch(`/api/directchannels/${directChannelId}`);
		if (response.ok) {
			const data = await response.json();
			dispatch(actionSetSingleUserDirectChannel(data));
		}
	};

const initialState = {
	userDirectChannels: {},
	singleUserDirectChannel: {}
};

export default function reducer(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case SET_USER_DIRECT_CHANNELS:
			return { userDirectChannels: action.payload };
		case SET_SINGLE_USER_DIRECT_CHANNEL:
			newState.singleUserDirectChannel = action.payload;
			const messagesObj = {};
			action.payload.messages.forEach(msg => {
				messagesObj[msg.id] = msg;
			});
			newState.singleUserDirectChannel.messages = messagesObj;
			return newState;
		case CLEAR_SINGLE_DIRECT_CHANNEL:
			newState.singleUserDirectChannel = {};
			return newState;
		case CLEAR_ALL:
			return initialState;
		default:
			return state;
	}
}
