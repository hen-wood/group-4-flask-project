from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Channel, ChannelComment, Server, DirectMessage, db
from flask_socketio import SocketIO, emit
from datetime import datetime
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://group-4-discord.onrender.com",
        "https://discord-clone-maks.onrender.com",
        "https://discordance-kqe3.onrender.com",
        "https://discord-clone-31dg.onrender.com",
        "http://group-4-discord.onrender.com",
        "http://discord-clone-maks.onrender.com",
        "http://discordance-kqe3.onrender.com",
        "http://discord-clone-31dg.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("message")
def handle_chat(data):
    new_message = DirectMessage(
        direct_channel_id = data['directChannelId'],
        user_id = data['userId'],
        content = data['content']
    )
    db.session.add(new_message)
    db.session.commit()
    data['id']=new_message.id
    data['created_at']=datetime.strptime(str(new_message.created_at), "%Y-%m-%d %H:%M:%S.%f").strftime("%a, %d %b %Y %H:%M:%S GMT")
    event = f"{data['directChannelId']} message"
    emit(event, data, broadcast=True)


@socketio.on('edit message')
def handle_edit_message(data):
    message_to_edit = DirectMessage.query.filter(DirectMessage.id == data['message_id']).one()
    message_to_edit.content = data['content']
    message_to_edit.edited = True
    db.session.add(message_to_edit)
    db.session.commit()
    data['id']=message_to_edit.id
    data['username']=message_to_edit.message_user.username
    data['created_at']=datetime.strptime(str(message_to_edit.created_at), "%Y-%m-%d %H:%M:%S.%f").strftime("%a, %d %b %Y %H:%M:%S GMT")
    event = f"{data['channel_id']} edit message"
    emit(event, data, broadcast=True)

@socketio.on('delete message')
def handle_edit_message(data):
    message_to_delete = DirectMessage.query.filter(DirectMessage.id == data['message_id']).one()
    db.session.delete(message_to_delete)
    db.session.commit()
    event = f"{data['channel_id']} delete message"
    emit(event, data, broadcast=True)

@socketio.on("comment")
def handle_comments(data):
    new_comment = ChannelComment(
        channel_id = data['channelId'],
        user_id = data['userId'],
        content = data['content']
    )
    db.session.add(new_comment)
    db.session.commit()
    data['id']=new_comment.id
    data['created_at']=datetime.strptime(str(new_comment.created_at), "%Y-%m-%d %H:%M:%S.%f").strftime("%a, %d %b %Y %H:%M:%S GMT")
    event = f"{data['channelId']} comment"
    emit(event, data, broadcast=True)


@socketio.on('edit comment')
def handle_edit_comment(data):
    comment_to_edit = ChannelComment.query.filter(ChannelComment.id == data['Comment_id']).one()
    comment_to_edit.content = data['content']
    comment_to_edit.edited = True
    db.session.add(comment_to_edit)
    db.session.commit()
    data['id']=comment_to_edit.id
    data['created_at']=datetime.strptime(str(comment_to_edit.created_at), "%Y-%m-%d %H:%M:%S.%f").strftime("%a, %d %b %Y %H:%M:%S GMT")
    event = f"{data['channel_id']} edit comment"
    emit(event, data, broadcast=True)

@socketio.on('delete comment')
def handle_edit_comment(data):
    comment_to_delete = ChannelComment.query.filter(ChannelComment.id == data['comment_id']).one()
    db.session.delete(comment_to_delete)
    db.session.commit()
    event = f"{data['channel_id']} delete comment"
    emit(event, data, broadcast=True)
