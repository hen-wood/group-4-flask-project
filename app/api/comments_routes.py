from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import ChannelComment, db


comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/<int:channelId>')
@login_required
def get_comments(channelId):
    """
    Query for all comments and returns them in a date order
    """
    comments = ChannelComment.query.filter(ChannelComment.channel_id==channelId).all()
    return {'comments': [comment.to_dict() for comment in comments]}



@comments_routes.route('/', methods=['POST'])
@login_required
def add_comment():
    """
    Add comment and returns it in a date order
    """
    request_data = request.get_json()

    comment = ChannelComment(
            user_id=request_data['user_id'],
            channel_id=request_data['channel_id'],
            content=request_data['content']
        )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

@comments_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """
    Edit comment and return
    """
    comment = ChannelComment.query.get(id)
    content = request.json['content']
    comment.content = content
    db.session.commit()
    return comment.to_dict()


@comments_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Delete comment
    """
    comment = ChannelComment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return "Comment was successfully deleted"
