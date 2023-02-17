import React, { useEffect, useState } from "react";
import * as channelActions from "../../store/serverChannels";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";

function CreateChannelModal(props) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            return dispatch(channelActions.createChannelThunk({ name, description }, props.serverId))
            .then(() => {
                props.callbackClose();
                closeModal();
            })
            .catch(async (res) => {
                const data = await res?.json();
                const { message } = data;
                setErrors([message]);
            });
        }
    }

    const validate = () => {
        const errors = [];
        if (description === "") errors.push("Please enter your description");
        if (name === "") errors.push("Please enter your channel name");
        setErrors(errors);
        if (errors.length > 0) return false;
        else return true;
    };

    return (
        <div className="create-channel-container">
            <h1>Create Channel</h1>
            <form onSubmit={handleSubmit}>
                <ul className="error-container">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Channel Name:
                    <textarea
                        className="textarea"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Channel description:
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button onClick={() => closeModal()}>Cancel</button>
                <button type="submit" >Submit</button>
            </form >
        </div >
    );
}

export default CreateChannelModal;
