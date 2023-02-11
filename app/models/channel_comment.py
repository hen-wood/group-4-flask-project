from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class ChannelComment(db.Model):
    __tablename__ = 'channel_comments_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #postgreSQL does not take a length argument
    content = db.Column(db.Text, nullable=False)
    #has to be a foreignkey in order to connect to the channel table in a many comments to one channel relationship
    channel_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("channels_table.id")), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'created_at': self.created_at
        }
