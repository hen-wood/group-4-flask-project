const LOAD_SERVERS = '/servers/LOAD';
const CREATE_SERVER = '/server/ADD';
const DELETE_SERVER = '/serverlist/DELETE'
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

const createServer = (servers) => {
    return {type: CREATE_SERVER, servers}
}

export const createServerThunk = (payload) => async dispatch => {
    console.log('in create server thunk')
    const response = await fetch(`/api/servers/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createServer(data))

    }
}


export const deleteServerList = (server) => {
    return{
        type: DELETE_SERVER,
        server
    }
}


const initialState = {

};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVERS:
            const newState = {...state}
            // console.log('in reducer for all spots to load', action.servers)
            action.servers.forEach(server => {
                console.log(server, 'serverhere in loop')
                newState[server.id] = server
            })
            return {...newState};
        case CREATE_SERVER:
            const newServerState = {...state }
            console.log(newServerState)
            console.log('in reducer to create server', action.servers)
            newServerState[action.servers.id] = action.servers
            return newServerState
        case DELETE_SERVER:
            const deleteState = {...state}
            console.log(action.server, 'asdasdasdasd',deleteState[action.server])
            delete deleteState[action.server]
            return deleteState
        default:
            // console.log('in default')
            return state;
    }
}
