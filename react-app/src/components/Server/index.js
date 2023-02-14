import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {thunkGetServer} from "../../store/server";
import './server.css'
export default function Server() {
    const dispatch = useDispatch();
    console.log('in server component')
    let server = []
    const {serverId} = useParams()
    const serverObj = useSelector(state => {
        return state.server
    })
    console.log('serverobbj', serverObj)

    if (serverObj) {
        server = Object.values(serverObj);
    }

    useEffect(() => {
        dispatch(thunkGetServer(serverId))
        console.log(server, serverObj, 'sinnnnn useeffect')
    }, [dispatch, server.length, serverId])


    console.log(server, serverObj, 'sinnnnn serverobj')
    if (!serverObj) {

        return <div>no servers</div>
    }

    return serverObj && (
        <div>
            {serverObj.name}
            </div>
    )
}
