from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Membership, Server, Channel,DirectChannel, ChannelComment, DirectMessage
from sqlalchemy import or_, and_



membership_routes = Blueprint('memberships', __name__)

@membership_routes.route('/delete', methods=['DELETE'])
def delete_membership():
    data = request.json
    member_id = data['member_id']
    server_id = data['server_id']

    member_to_delete = Membership.query.filter(and_(Membership.user_id==member_id, Membership.server_id==server_id)).one()

    db.session.delete(member_to_delete)
    db.session.commit()

    return {'success':'deleted memberhsip'}
