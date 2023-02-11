from .db import db, environment, SCHEMA
import datetime

class Membership(db.Model):
    __tablename__ = 'memberships_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers_table.id') ,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id') , nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    server_members = db.relationship('Server', foreign_keys=[server_id])
    user_memberships = db.relationship('User', foreign_keys=[user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
        }
