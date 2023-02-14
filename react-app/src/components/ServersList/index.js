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
        console.log('in it')
      servers = Object.values(serversObj);
    }


    console.log(servers, 'here')
    useEffect(() => {
        dispatch(thunkGetUserServers())
        console.log(servers, serversObj, 'innnnn')
    }, [dispatch, servers.length])

    // const directChannels = useSelector(state => state.directChannels.userDirectChannels);
    console.log(servers, serversObj, 'innnnn')
    const currUserId = useSelector(state => state.session.user.id);
    if (!servers) {

        return <div>no servers</div>
    }

    return servers ? (
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
    ) : (
        <div>nothing </div>
    )
}
