from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, ChannelComment, Channel


channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:serverId>')
# @login_required
def get_channels(serverId):
    """
    Query for all channels and return
    """
    channels = Channel.query.filter(Channel.server_id==serverId).all()
    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/<int:serverId>', methods=['POST'])
# @login_required
def add_channel(serverId):
    """
    Add channel and return
    """
    request_data = request.get_json()

    channel = Channel(
            name=request_data['name'],
            server_id=serverId,
            description=request_data['description']
        )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


@channel_routes.route('/<int:serverId>/<int:channelId>', methods=['PUT'])
def edit_channel(serverId, channelId):
    """
    Edit channel desciption and return
    """
    channel = Channel.query.get(channelId)
    description = request.json['description']
    channel.description = description
    db.session.commit()
    return channel.to_dict()


@channel_routes.route('/<int:serverId>/<int:channelId>', methods=['DELETE'])
# @login_required
def delete_channel(serverId, channelId):
    """
    Delete channel
    """
    channel = Channel.query.get(channelId)
    db.session.delete(channel)
    db.session.commit()
    return f"channel id:{channelId} was successfully deleted"
