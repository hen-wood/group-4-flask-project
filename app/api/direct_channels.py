from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Membership, Server,Channel,DirectChannel,ChannelComment, DirectMessage, db
import json
from flask_login import current_user
from sqlalchemy import or_

direct_channels = Blueprint('directchannels', __name__)

# Get all direct channels for current user
@direct_channels.route('/current')
def get_all_user_direct_channels():
    userId = current_user.id
    channels = DirectChannel.query.filter(or_(DirectChannel.user_one_id == userId, DirectChannel.user_two_id == userId)).all()
    res = [channel.to_dict() for channel in channels]
    return jsonify(res), 200

@direct_channels.route('/<int:directChannelId>')
def get_all_direct_channel_messages(directChannelId):
    messages = DirectMessage.query.filter(DirectMessage.direct_channel_id == directChannelId).all()
    print(messages)
    res = [message.to_dict() for message in messages]
    print(res)
    return jsonify(res)