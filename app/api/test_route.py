from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Membership, Server, db


test_route = Blueprint('test', __name__)

@test_route.route('/users/<int:userId>')
def get_user_with_servers(userId):
    user = User.query.filter_by(id=userId).first()
    print(user.to_dict())
    return jsonify(user.to_dict())

@test_route.route('/servers/<int:serverId>')
def get_server_by_id(serverId):
    server = Server.query.filter_by(id=serverId).first()
    db.session.delete(server)
    db.session.commit()
    # return jsonify(server.user_data())
    members = Membership.query.all()
    return members
