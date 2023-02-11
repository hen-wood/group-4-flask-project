from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Channel(db.Model):
    __tablename__ = 'channels_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    #has to be a foreignkey in order to connect to the server table in a many channels to one server relationship
    server_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("servers_table.id")))
    description = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


#added to join channel_comments_table relationship and if channel is deleted then the channel comment will be deleted,
# db.relationship is called here in order to define this table as the "Parent" of the ChannelComment
# table. So if this table is deleted then all channels comments are deleted --chase
    channel_comments = db.relationship("ChannelComment",  cascade="all")



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'description': self.description
        }
