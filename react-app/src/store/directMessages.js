// constants
const SET_DIRECT_MESSAGES = "directMessages/SET_DIRECT_MESSAGES";

// Action Creators
const actionSetDirectMessages = userDirectChannels => {
	const messagesObj = {};
	userDirectChannels.forEach(message => (messagesObj[message["id"]] = message));
	return {
		type: SET_DIRECT_MESSAGES,
		payload: messagesObj
	};
};

// Thunks

export const thunkGetDirectMessages = directChannelId => async dispatch => {
	const response = await fetch(`/api/directchannels/${directChannelId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(actionSetDirectMessages(data));
	}
};

const initialState = {
	directChannelMessages: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_DIRECT_MESSAGES:
			return { directChannelMessages: action.payload };
		default:
			return state;
	}
}
