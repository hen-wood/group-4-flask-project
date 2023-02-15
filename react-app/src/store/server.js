const LOAD_SERVER = '/server/LOAD';
const DELETE_SERVER = '/server/DELETE';

export const thunkGetServer = (id) => async dispatch => {
    const response = await fetch(`/api/servers/${id}`)
    if (response.ok) {
        const server = await response.json()
        console.log(server)
        dispatch(loadServer(server))
    }

}




export const deleteServerThunk = (id) => async dispatch => {
    const response = await fetch(`/api/servers/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){

        const data = await response.json();
        dispatch(deleteServer(data))
    }

}





const loadServer = (server) => {
    return {type: LOAD_SERVER, server}
}

const deleteServer = (server) => {
    return{
        type: DELETE_SERVER,
        server
    }
}



const initialState = {};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVER:
            const loadServerState = {...action.server }
            console.log(action.server, 'in load server reducer')
            return loadServerState
        case DELETE_SERVER:
            const deleteState = {}
            return deleteState
        default:
            console.log('in default SERVER')
            return state;
    }
}
