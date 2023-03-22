from .db import db, environment, SCHEMA, add_prefix_for_prod
import uuid
from sqlalchemy.sql import func
from sqlalchemy_utils import ChoiceType

import datetime

class Server(db.Model):
    category_choices = [('Gaming', 'Gaming'),
                        ('Entertainment', 'Entertainment'),
                        ('Artists & Creators', 'Artists & Creators'),
                        ('Local Community', 'Local Community'),
                        ('Education', 'Education'),
                        ('Science & Tech', 'Science & Tech'),
                        ('Other', 'Other')]
    __tablename__ = 'servers_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    mod_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    code = db.Column(db.String,  default=lambda: str(uuid.uuid4())[0:5], unique=True)
    category = db.Column(ChoiceType(category_choices), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)



#added to join channels relationship and if server is deleted then the channel will be deleted,
# db.relationship is called here in order to define this table as the "Parent" of the channels
# table. So if this table is deleted then all channels in the server are deleted --chase
    server_channels = db.relationship("Channel",  cascade="all")


    server_mod = db.relationship('User', back_populates='user_servers')
    server_members = db.relationship('Membership', back_populates='server', cascade="all, delete")

    def user_data(self):
        return{
            'id': self.id,
            'name': self.name,
            # 'members': [{'username':member.user.username, 'email':member.user.email} for member in self.server_members]
        }
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'mod_id': self.mod_id
        }


    def to_dict_single_server(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'mod_id': self.mod_id,
            'server_mod': self.server_mod.to_dict(),
            'category': str(self.category) ,
            'server_members': [member.user.to_dict() for member in self.server_members],
            'channels': [channel.to_dict() for channel in self.server_channels]
        }


    def to_dict_all_servers(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'mod_id': self.mod_id,
            'server_mod': self.server_mod.to_dict(),
            # 'members': [{'id':member.user.username, 'username':member.user.username, 'email':member.user.email} for member in self.server_members]
        }
