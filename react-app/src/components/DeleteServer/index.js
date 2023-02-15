import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {deleteServerThunk} from '../../store/server';
import {useHistory} from 'react-router-dom';
import './deleteServer.css';

export default function DeleteServer() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const serverObj = useSelector(state => state.server);


    if (!serverObj) {
        return null
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteServerThunk(serverId));

        history.push(`/channels/@me`);
    }

    return (<div>


        <form onSubmit={handleSubmit}>
            <input type='submit' value="Delete Server"/>
        </form>


    </div>);
}
