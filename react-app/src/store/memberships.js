const ADD_MEMBERSHIP = '/membership/ADD';
const LEAVE_MEMBERSHIP = '/membership/LEAVE'

export const thunkAddMembership = (codeId) => async dispatch => {
    console.log('in add membership')
    const response = await fetch(`/api/servers/code/${codeId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(codeId)

    })
    if (response.ok) {
        console.log('response good')
        const membership = await response.json()
        console.log(membership, 'here')
        dispatch(addMembership(membership))
    }

}
const addMembership = (membership) => {
    return {type: ADD_MEMBERSHIP, membership}
}






export const leaveServerThunk = (id) => async dispatch => {
    console.log('in leave server')
    const response = await fetch(`/api/servers/membership/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        console.log('response good leave server')
        const data = await response.json();
        console.log(data,'here')
        dispatch(leaveMembership(data))
    }
    else console.log(response, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

}



const leaveMembership = (server) => {
    return{
        type: LEAVE_MEMBERSHIP,
        server
    }
}






const initialState = {};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MEMBERSHIP:
            const loadMemberState = {...action.membership }
            console.log(action.membership, 'in load server reducer')
            return loadMemberState
        case LEAVE_MEMBERSHIP:
            console.log('in leave membership reducer')
            const deleteState = {}
            return deleteState

        default:
            console.log('in default MEMBERSHIP')
            return state;
    }
}
