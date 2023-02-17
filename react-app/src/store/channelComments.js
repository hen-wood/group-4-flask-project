// constants
const SET_CHANNEL_COMMENTS = "channelComments/SET_CHANNEL_COMMENTS";
const ADD_CHANNEL_COMMENT = "channelComments/ADD_CHANNEL_COMMENT";
const CLEAR_CHANNEL_COMMENTS = "channelComments/CLEAR_CHANNEL_COMMENTS";

// Action Creators
const setChannelComments = data => {
	const commentsObj = {};
	data.comments.forEach(comment => {
		commentsObj[comment.id] = comment;
	});
	return {
		type: SET_CHANNEL_COMMENTS,
		payload: commentsObj
	};
};

export const addChannelComment = comment => {
	return {
		type: ADD_CHANNEL_COMMENT,
		comment
	};
};

export const clearComments = () => {
	return {
		type: CLEAR_CHANNEL_COMMENTS
	};
};

// Thunks
export const getChannelCommentsThunk = channelId => async dispatch => {
	const response = await fetch(`/api/comments/${channelId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(setChannelComments(data));
	}
};

const initialState = {
	channelComments: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CHANNEL_COMMENTS:
			return action.payload;
		case CLEAR_CHANNEL_COMMENTS:
			return initialState;
		default:
			return state;
	}
}
