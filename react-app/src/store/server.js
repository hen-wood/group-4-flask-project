
const LOAD_SERVER = '/server/LOAD';


export const thunkGetServer = (id) => async dispatch => {
    console.log('in thunk')
    const response = await fetch(`/api/servers/${id}`)
    if (response.ok) {
        console.log('response good')
        const server = await response.json()
        console.log(server)
        dispatch(loadServer(server))
    }

}




const loadServer = (server) => {
    return {type: LOAD_SERVER, server}
}



const initialState = {

};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVER:
            const loadServerState={...action.server}
            console.log(action.server, 'in load server reducer')
            return loadServerState
        default:
            console.log('in default')
            return state;
    }
}
