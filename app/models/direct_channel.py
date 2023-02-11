from .db import db, environment, SCHEMA
import datetime

class DirectChannel(db.Model):
    __tablename__ = 'direct_channels_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_one = db.Column(db.Integer, nullable=False)
    user_two = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)



#added to join direct_channel_comments_table relationship and if channel is deleted then the channel comment will be deleted,
# db.relationship is called here in order to define this table as the "Parent" of the DirectMessage
# table. So if this table is deleted then all direct channel comments are deleted --chase
    direct_channel_comments = db.relationship("DirectMessage",  cascade="all")

    def to_dict(self):
        return {
            'id': self.id,
            'user_one': self.user_one,
            'user_two': self.user_two,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
