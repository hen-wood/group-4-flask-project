const LOAD_CHANNELS = '/channels/LOAD';

const loadChannels = (channels) => {
    return {type: LOAD_CHANNELS, channels}
}


export const thunkGetServerChannels = (id) => async dispatch => {
    console.log('in thunk to get server channels')
    const response = await fetch(`/api/servers/${id}`)
    console.log(id , 'here with id')
    if (response.ok) {
        console.log('response good')
        const channels= await response.json()
        // console.log(servers)
        dispatch(loadChannels(channels))
    }

}






const initialState = {

};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CHANNELS:
            const newState = {}
            console.log('in reducer for all channels on a server to load',action.channels)
            action.channels.channels.forEach(channel => {
                newState[channel.id] = channel
            })
            return {...newState};
        default:
            console.log('in default')
            return state;
    }
}
