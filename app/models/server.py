from .db import db, environment, SCHEMA
import uuid

class Server(db.Model):
    __tablename__ = 'servers_table'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    mod_id = db.Column(db.Integer, nullable=False)
    code = db.Column(db.String(5), default=str(uuid.uuid4()), unique=True, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'mod_id': self.mod_id
        }
