from flask import Blueprint, request
from app.models import db, Icon
from flask_login import login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

icon_routes = Blueprint("icons", __name__)


@icon_routes.route("/<serverId>", methods=["POST"])
@login_required
def upload_image(serverId):
    print('in icon route with image')
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    image = request.files["image"]
    print('after image request.files ', image)
    # print('userId', userId, " url", request.body)
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print('in s3 uploading', upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # serverIcon = Icon.query.get(server_id = serverId)
    print(upload, ' upload')
    serverIcon = db.session.query(Icon).filter(Icon.server_id == serverId).first()
    if serverIcon:
        serverIcon.icon = url
        db.session.commit()
        print('in hererererererer')
        return {"url": url}
    new_image = Icon(server_id=serverId, icon=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}
