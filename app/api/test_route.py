from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Membership, Server,Channel,DirectChannel,ChannelComment, DirectMessage, db
import json


test_route = Blueprint('test', __name__)

@test_route.route('/users/<int:userId>')
def get_user_with_servers(userId):
    user = User.query.filter_by(id=userId).first()
    print(user.to_dict())
    return jsonify(user.to_dict())

@test_route.route('/servers/<int:serverId>')
def get_server_by_id(serverId):
    server = Server.query.filter_by(id=serverId).first()
    print(server)
    db.session.delete(server)
    db.session.commit()
    # return jsonify(server.user_data())
    members = Membership.query.all()
    return '<h1> deleted servers, go check to see if channels and comments are also gone in db </h1>'


@test_route.route('/channel/<int:channelId>')
def get_channel_by_id(channelId):
    channel = Channel.query.filter_by(id=channelId).first()
    print(channel)
    db.session.delete(channel)
    db.session.commit()
    # return jsonify(server.user_data())

    return '<h1> deleted Channel, go check to see if comments are also gone in DB </h1>'


@test_route.route('/comment/<int:commentId>')
def get_comment_by_id(commentId):
    comment = ChannelComment.query.filter_by(id=commentId).first()
    print(comment)
    db.session.delete(comment)
    db.session.commit()
    # return jsonify(server.user_data())

    return '<h1> deleted direct comment, go check to see if the single direct comment is gone in DB </h1>'




@test_route.route('/directchannel/<int:channelId>')
def get_direct_channel_by_id(channelId):
    d_channel = DirectChannel.query.filter_by(id=channelId).first()
    print(d_channel)
    db.session.delete(d_channel)
    db.session.commit()
    # return jsonify(server.user_data())

    return '<h1> deleted direct Channel, go check to see if all direct comments are also gone in DB </h1>'



@test_route.route('/directcomment/<int:commentId>')
def get_direct_comment_by_id(commentId):
    d_comment = DirectMessage.query.filter_by(id=commentId).first()
    print(d_comment)
    db.session.delete(d_comment)
    db.session.commit()
    # return jsonify(server.user_data())

    return '<h1> deleted direct comment, go check to see if the single direct comment is gone in DB </h1>'
