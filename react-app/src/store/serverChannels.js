const LOAD_CHANNELS = '/channels/LOAD';
const CREATE_CHANNEL = 'channels/CREATE_CHANNEL';
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL';
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL';

// Action creator
export const loadChannels = (channels) => {
    return { type: LOAD_CHANNELS, channels }
}

export const createChannel = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})

export const editChannel = (channel) => ({
    type: EDIT_CHANNEL,
    channel
})

export const deleteChannel = (channelId) => ({
    type: DELETE_CHANNEL,
    channelId
})


// Thunks
export const thunkGetServerChannels = (id) => async dispatch => {
    const response = await fetch(`/api/servers/${id}`)
    if (response.ok) {
        const channels = await response.json()
        dispatch(loadChannels(channels))
    }
}


export const createChannelThunk = (userInput, serverId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${serverId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput)
    });
    if (response.ok) {
        const channel = await response.json();
        dispatch(createChannel(channel));
        return channel;
    }
}


export const editChannelThunk = (input, serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${serverId}/${channelId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
    })
    if (response.ok) {
        const editedChannel = await response.json();
        dispatch(editChannel(editedChannel));
        return editedChannel;
    }
}

export const deleteChannelThunk = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${serverId}/${channelId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const channel = await response.json();
        dispatch(deleteChannel(channel));
        return channel;
    }
}

// Initial State
const initialState = {
    channels: {}
};


// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CHANNELS: {
            const newState = {}
            action.channels.channels.forEach(channel => {
                newState[channel.id] = channel
            })
            return { ...newState };
        }
        case CREATE_CHANNEL:
            return {
                ...state,
                [action.channel.id]: action.channel
            }
        case DELETE_CHANNEL: {
            const newState = {
                ...state
            }
            delete newState.channels[action.channelId]
            return newState
        }
        case EDIT_CHANNEL: {
            return {
                ...state,
                [action.channel.id]: action.channel
            }
        }
        default:
            return state;
    }
}
