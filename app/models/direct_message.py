from .db import db, environment, SCHEMA
import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #has to be a foreignkey in order to connect to the direct channel table in a many comments to one channel relationship
    direct_channel_id = db.Column(db.Integer,db.ForeignKey("direct_channels_table.id"), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'direct_channel_id': self.direct_channel_id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at
        }
