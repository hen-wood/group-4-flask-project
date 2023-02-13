
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Channel, ChannelComment, Server, DirectMessage, db
from flask_socketio import SocketIO, emit
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("message")
def handle_chat(data):
    print(data)
    new_message = DirectMessage(
        direct_channel_id = data['directChannelId'],
        user_id = data['userId'],
        content = data['content']
    )
    db.session.add(new_message)
    db.session.commit()
    event = f"{data['directChannelId']} message"
    emit(event, data, broadcast=True)
