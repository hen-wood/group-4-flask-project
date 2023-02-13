from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #has to be a foreignkey in order to connect to the direct channel table in a many comments to one channel relationship
    direct_channel_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("direct_channels_table.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    message_user = db.relationship('User', foreign_keys=[user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'direct_channel_id': self.direct_channel_id,
            'username': self.message_user.username,
            'content': self.content,
            'created_at': self.created_at
        }
