import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {thunkGetUserServers} from "../../store/servers";
import './servers.css'
export default function ServersList() {
    const dispatch = useDispatch();
    let servers = []
    const serversObj = useSelector(state => {
        return state.servers
    })

    if(serversObj){
      servers = Object.values(serversObj);
    }


    useEffect(() => {
        dispatch(thunkGetUserServers())

    }, [dispatch, servers.length])

    // const directChannels = useSelector(state => state.directChannels.userDirectChannels);
    const currUserId = useSelector(state => state.session.user.id);
    if (!servers) {

        return <div>no servers</div>
    }

    return servers && (
        <div>

            {servers.map((server) => (
               server ?(
                <div>
                   <Link key={server.id} to={`/channels/${server.id}`}>{server.name}
                    </Link>
                    </div>
                    ) : (<div>nothin</div>)
                ))}
        </div>
    )
}
