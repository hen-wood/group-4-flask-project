from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Membership, Server, Channel,DirectChannel, ChannelComment, DirectMessage
from sqlalchemy import or_



server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
# @login_required
def get_current_user_servers():
    userId = current_user.id
    memberships = Membership.query.filter(Membership.user_id == userId).all()
    servers = [Server.query.get(membership.server_id) for membership in memberships]

    res = [server.to_dict() for server in servers]

    return jsonify(res)