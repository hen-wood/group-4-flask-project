import React, { useEffect, useState } from "react";
import * as channelActions from "../../store/serverChannels";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function EditChannelModal(props) {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(props.description);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = [];
        if (description === "") errors.push("Please enter your description");
        setErrors(errors);
    }, [description]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedChannel = {
            server_id: props.serverId,
            name: props.name,
            description,
            id: props.channelId
        }
        return dispatch(channelActions.editChannelThunk(editedChannel, props.channelId))
            .then(() => {
                props.callbackClose();
                closeModal();
            })
            .catch(async (res) => {
                const data = await res?.json();
                const { message } = data;
                setErrors([message]);
            });
    };

    return (
        <div>
            <h1>Edit your channel description</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Description
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

export default EditChannelModal;
