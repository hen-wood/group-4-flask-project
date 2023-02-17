from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class DirectChannel(db.Model):
    __tablename__ = 'direct_channels_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_one_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_two_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user_one = db.relationship("User", foreign_keys=[user_one_id])
    user_two = db.relationship("User", foreign_keys=[user_two_id])

#added to join direct_channel_comments_table relationship and if channel is deleted then the channel comment will be deleted,
# db.relationship is called here in order to define this table as the "Parent" of the DirectMessage
# table. So if this table is deleted then all direct channel comments are deleted --chase
    direct_channel_messages = db.relationship("DirectMessage",  cascade="all")

    def to_dict(self):
        return {
            'id': self.id,
            'user_one': {
                'id': self.user_one.id,
                'username': self.user_one.username
                },
            'user_two': {
                'id': self.user_two.id,
                'username': self.user_two.username
                },
            'messages': [message.to_dict() for message in self.direct_channel_messages]
        }
