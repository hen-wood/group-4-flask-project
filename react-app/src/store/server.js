const LOAD_SERVER = "/server/LOAD";
const DELETE_SERVER = "/server/DELETE";
const EDIT_SERVER = "/server/UPDATE"
export const thunkGetServer = id => async dispatch => {
	const response = await fetch(`/api/servers/${id}`);
	if (response.ok) {
		const server = await response.json();
		dispatch(loadServer(server));
	}
};




export const editServerThunk = (payload, id) => async dispatch => {
    // console.log(id, ' in edit')
    const response = await fetch(`/api/servers/${id}`, {
        method: 'PUT',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(editServer(data))
    }

}


const editServer = (server) => {
    return {
        type: EDIT_SERVER,
        server
    }
}





export const deleteServerThunk = id => async dispatch => {
	const response = await fetch(`/api/servers/${id}`, {
		method: "DELETE"
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteServer(data));
	}
};

const loadServer = server => {
	return { type: LOAD_SERVER, server };
};

const deleteServer = server => {
	return {
		type: DELETE_SERVER,
		server
	};
};

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_SERVER:
			const loadServerState = { ...action.server };
			return loadServerState;
		case DELETE_SERVER:
			const deleteState = {};
			return deleteState;
		case EDIT_SERVER:
			const editState = {...state};
            editState[action.server.id] = action.server;

            return editState
		default:
			return state;
	}
}
