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


    def to_dict(self):
        return {
            'id': self.id,
            'user_one': self.user_one,
            'user_two': self.user_two,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }