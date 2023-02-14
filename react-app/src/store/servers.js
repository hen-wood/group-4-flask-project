const LOAD_SERVERS = '/servers/LOAD';
const LOAD_SERVER = '/server/LOAD';

export const thunkGetUserServers = () => async dispatch => {
    const response = await fetch("/api/servers/")
    if (response.ok) {
        console.log('response good')
        const servers = await response.json()
        console.log(servers)
        dispatch(loadServers(servers))
    }

}



const loadServers = (servers) => {
    return {type: LOAD_SERVERS, servers}
}




const initialState = {

};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVERS:
            const newState = {}
            // console.log('in reducer for all spots to load', action.servers)
            action.servers.forEach(server => {
                newState[server.id] = server
            })
            return {...newState};
        case LOAD_SERVER:
            const loadServerState={...action.server}
            console.log(action.server, 'in load server reducer')
            return loadServerState
        default:
            console.log('in default')
            return state;
    }
}
