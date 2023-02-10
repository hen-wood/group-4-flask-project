from .db import db, environment, SCHEMA
import datetime

class ChannelComment(db.Model):
    __tablename__ = 'channel_comments_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(2000), nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'channel_id': self.channel_id,
            'user_id': self.user_id

        }
