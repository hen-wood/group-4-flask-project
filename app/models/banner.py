from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Banner(db.Model):
    __tablename__ = 'banners_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    banner = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("servers_table.id")))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)




    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'banner': self.banner
        }
