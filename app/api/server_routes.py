from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Membership, Server, Channel,DirectChannel, ChannelComment, DirectMessage
from sqlalchemy import or_, and_



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

    res = [server.to_dict_all_servers() for server in servers]

    return jsonify(res)


@server_routes.route('/<int:serverId>')
#@login_required
def get_single_server(serverId):
    '''
    Returns selected Server with Channel and Member data
    '''

    server = Server.query.get(serverId)


    return server.to_dict_single_server()


@server_routes.route('/', methods=['POST'])
#@login_required
def add_server():
    '''
    Creates a new Server and returns it
    '''

    req_data = request.get_json()
    server = Server(
        name = req_data['name'],
        category = req_data['category'],
        mod_id = current_user.id
    )
    db.session.add(server)
    db.session.commit()
    membership = Membership(
        server_id = server.id,
        user_id = current_user.id
    )
    general_channel = Channel(
        name = 'General Chat',
        server_id = server.id
    )
    db.session.add(membership)
    db.session.add(general_channel)
    db.session.commit()
    db.session.commit()
    return server.to_dict_single_server()





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



@server_routes.route('/code/<codeId>', methods=['POST'])
#@login_required
def add_member_to_server(codeId):
    '''
    Adds a member to an existing sever
    '''


    print(codeId,'codeID')
    server = Server.query.filter_by(code=codeId).first()
    if server is not None:
        if Membership.query.filter_by(server_id=server.id, user_id=current_user.id).first():
            return jsonify({"message": "You already have a membership to that server"}),401
        membership = Membership(
        server_id = server.id,
        user_id = current_user.id)
        db.session.add(membership)
        db.session.commit()
        return server.to_dict_single_server()
    return jsonify({"message": "There is no server with the code entered"}), 404



@server_routes.route('/membership/<serverId>', methods=['DELETE'])
#@login_required
def delete_member_to_server(serverId):
    '''
   Removes member to an existing sever
    '''

    print(serverId,'serverID')
    membership = Membership.query.filter_by(server_id=serverId, user_id=current_user.id).first()


    db.session.delete(membership)
    db.session.commit()
    return jsonify({"message": "Successfully removed from server"})





@server_routes.route('/<int:serverId>', methods=['DELETE'])
#@login_required
def delete_server(serverId):
    '''
    Delete Server
    '''
    user_id = current_user.id
    server = Server.query.get(serverId)
    print('hasdasdasdasd ', server.mod_id)
    if user_id != server.mod_id:
         return jsonify({"message": "you must be the owner of the server to delete it"})
    db.session.delete(server)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"})
