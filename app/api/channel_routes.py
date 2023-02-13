from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, ChannelComment, Channel


channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
# @login_required
def get_channels():
    """
    Query for all channels and return
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}



@channel_routes.route('/', methods=['POST'])
# @login_required
def add_channel():
    """
    Add channel and return
    """
    request_data = request.get_json()

    channel = Channel(
            name=request_data['name'],
            server_id=request_data['server_id'],
            description=request_data['description']
        )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()

@channel_routes.route('/<int:id>', methods=['PUT'])
def edit_channel(id):
    """
    Edit channel desciption and return
    """
    channel = Channel.query.get(id)
    description = request.json['description']
    channel.description = description
    db.session.commit()
    return channel.to_dict()


@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    """
    Delete channel
    """
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return "Channel was successfully deleted"
