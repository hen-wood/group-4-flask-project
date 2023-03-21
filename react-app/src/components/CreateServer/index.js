import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createServerThunk} from "../../store/servers";
import "./createServer.css";
import {useModal} from "../../context/Modal";

export default function CreateServer() {

    const dispatch = useDispatch();
    const [serverName, setServerName] = useState();
    const [category, setCategory] = useState('Gaming');
    const {closeModal} = useModal();
    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            name: serverName,
            category
        };

        dispatch(createServerThunk(payload));
        setServerName("");
        closeModal();

    };

    return (
        <div className="createServerContainer">
            <form className="createForm"
                onSubmit={handleSubmit}>
					<div className="serverNameContainer">

                <input type="text" placeholder="Server Name" required
                    value={serverName}
                    onChange={
						e => setServerName(e.target.value)
                    }/>
					</div>
                <div className="categoryContainer"
                    onChange={
                        e => setCategory(e.target.value)
                }>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Gaming" name="category"/>
                        Gaming
                    </div>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Entertainment" name="category"/>
                        Entertainment
                    </div>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Artists & Creators" name="category"/>
                        Artists & Creators
                    </div>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Education" name="category"/>
                        Education
                    </div>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Science & Tech" name="category"/>
                        Science & Tech
                    </div>
                    <div className="radioCategoryContainer">

                        <input type="radio" value="Other" name="category"/>
                        Other
                    </div>
                </div>

                <input type="submit" value="Create Server"></input>
            </form>
        </div>
    );
}
