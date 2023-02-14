from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Membership, Server, Channel,DirectChannel, ChannelComment, DirectMessage
from sqlalchemy import or_



server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
# @login_required
def get_current_user_servers():
    '''
    Returns all servers that current user is a member of 
    '''
    userId = current_user.id
    memberships = Membership.query.filter(Membership.user_id == userId).all()
    servers = [Server.query.get(membership.server_id) for membership in memberships]

    res = [server.to_dict() for server in servers]

    return jsonify(res)


@server_routes.route('/<int:serverId>')
#@login_required
def get_current_channel(serverId):
    '''
    Returns selected Channel
    '''

    server = Server.query.get(serverId)

    return server.to_dict()


@server_routes.route('/', methods=['POST'])
#@login_required
def add_server():
    '''
    Creates a new Server and returns it
    '''

    req_data = request.get_json()

    server = Server(
        name = req_data['name'],
        mod_id = current_user.id
    )
    db.session.add(server)
    db.session.commit()

    return server.to_dict()


@server_routes.route('/<int:serverId>', methods=['PUT'])
#@login_required
def edit_server(serverId):
    '''
    Edit Server name and return
    '''

    server = Server.query.get(serverId)
    server.name = request.json['name']
    db.session.commit()
    return server.to_dict()


@server_routes.route('/<int:serverId>', methods=['DELETE'])
#@login_required
def delete_server(serverId):
    '''
    Delete Server
    '''

    server = Server.query.get(serverId)
    db.session.delete(server)
    db.session.commit()
    return 'Server successfully deleted'