const ADD_MEMBERSHIP = "/membership/ADD";
const LEAVE_MEMBERSHIP = "/membership/LEAVE";

export const thunkAddMembership = codeId => async dispatch => {
    const response = await fetch(`/api/servers/code/${codeId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (response.ok) {
        const membership = await response.json();
		console.log(membership, 'here7')
        dispatch(addMembership(membership));
		return {}
    } else {
		const error = await response.json()
        return error
    }
};
const addMembership = membership => {
    return {type: ADD_MEMBERSHIP, membership};
};

export const leaveServerThunk = id => async dispatch => {
    const response = await fetch(`/api/servers/membership/${id}`, {method: "DELETE"});
    if (response.ok) {
        const data = await response.json();
        dispatch(leaveMembership(data));
    }
};

const leaveMembership = server => {
    return {type: LEAVE_MEMBERSHIP, server};
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MEMBERSHIP: const loadMemberState = {
                ... action.membership
            };
            return loadMemberState;
        case LEAVE_MEMBERSHIP: const deleteState = {};
            return deleteState;

        default:
            return state;
    }
}
