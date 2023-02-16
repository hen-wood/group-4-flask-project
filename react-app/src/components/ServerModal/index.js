import React from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ServerButton from "../Navigation/ServerButton";
import './ServerModal.css'
function ServerModal() {


    return (

            <div className="ServerButtonIcon">

                <OpenModalMenuItem  modalComponent={<ServerButton>

        
                </ServerButton>}>
                    </OpenModalMenuItem>
            </div>
        );
}

export default ServerModal;
