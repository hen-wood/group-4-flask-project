from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Membership(db.Model):
    __tablename__ = 'memberships_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers_table.id'), ondelete="cascade"))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'),ondelete="cascade"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = db.relationship('User', back_populates="user_memberships")
    server = db.relationship('Server', back_populates="server_members")

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
        }
