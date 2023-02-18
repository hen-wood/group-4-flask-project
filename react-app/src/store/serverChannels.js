const LOAD_CHANNELS = "/channels/LOAD";
const CREATE_CHANNEL = "/channels/CREATE_CHANNEL";
const EDIT_CHANNEL = "/channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "/channels/DELETE_CHANNEL";
const LOAD_SINGLE_CHANNEL = "/channels/LOAD_SINGLE_CHANNEL";
const CLEAR_SINGLE_CHANNEL = "/channels/CLEAR_SINGLE_CHANNEL";
// Action creator
export const loadChannels = channels => {
	return { type: LOAD_CHANNELS, channels };
};

export const createChannel = channel => ({
	type: CREATE_CHANNEL,
	channel
});

export const editChannel = channel => ({
	type: EDIT_CHANNEL,
	channel
});

export const deleteChannel = channel => ({
	type: DELETE_CHANNEL,
	channel
});

export const loadSingleChannel = channel => ({
	type: LOAD_SINGLE_CHANNEL,
	channel
});
export const actionClearChannel = () => ({
	type: CLEAR_SINGLE_CHANNEL
});

// Thunks
export const thunkGetServerChannels = id => async dispatch => {
	const response = await fetch(`/api/servers/${id}`);
	if (response.ok) {
		const channels = await response.json();
		dispatch(loadChannels(channels));
	}
};

export const loadSingleChannelThunk = id => async dispatch => {
	const response = await fetch(`/api/channels/${id}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadSingleChannel(data));
	}
};

export const createChannelThunk = (userInput, serverId) => async dispatch => {
	const response = await fetch(`/api/channels/${serverId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userInput)
	});
	if (response.ok) {
		const channel = await response.json();
		dispatch(createChannel(channel));
		return channel;
	}
};

export const editChannelThunk = (input, channelId) => async dispatch => {
	const response = await fetch(`/api/channels/${channelId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input)
	});
	if (response.ok) {
		const editedChannel = await response.json();
		dispatch(editChannel(editedChannel));
		return editedChannel;
	}
};

export const deleteChannelThunk = channelId => async dispatch => {
	const response = await fetch(`/api/channels/${channelId}`, {
		method: "DELETE"
	});
	if (response.ok) {
		dispatch(deleteChannel(channelId));
	}
};

// Initial State
const initialState = {
	channels: {},
	singleChannel: {}
};

// Reducer
export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case LOAD_CHANNELS: {
			newState = { ...state };
			action.channels.channels.forEach(channel => {
				newState[channel.id] = channel;
			});
			return { ...newState };
		}
		case LOAD_SINGLE_CHANNEL: {
			newState = { ...state };
			newState.singleChannel = action.channel;
			return newState;
		}
		case CLEAR_SINGLE_CHANNEL:
			newState = { ...state };
			newState.singleChannel = {};
			return newState;
			return;
		case CREATE_CHANNEL:
			return {
				...state,
				[action.channel.id]: action.channel
			};
		case DELETE_CHANNEL: {
			const newState = { ...state };
			delete newState[action.channel];
			return newState;
		}
		case EDIT_CHANNEL: {
			newState = { ...state };
			newState.singleChannel = action.channel;
			newState.channels[action.channel.id] = action.channel;
			return newState;
		}
		default:
			return state;
	}
}
