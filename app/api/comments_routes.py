from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.channel_comment import ChannelComment


comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/:channelId')
@login_required
def get_comments():
    """
    Query for all comments and returns them in a date order
    """
    results = ChannelComment.query.all()
    return results


@comments_routes.route('/', methods=['POST'])
@login_required
def add_comment():
    """
    Add comment and returns it in a date order
    """
    request_data = request.get_json()
    comment = ChannelComment(
            user_id=request_data.user_id,
            channel_id=request_data.channel_id,
            content=request_data.content
        )
    db.session.add(comment)
    db.session.commit()
    return comment


@comments_routes.route('/<id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """
    Edit comment and return
    """
    comment = ChannelComment.query.get(id)
    content = request.json["content"]
    comment.content = content
    db.session.commit()
    return comment


@comments_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Delete comment
    """
    comment = ChannelComment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return "Comment was successfully deleted"
