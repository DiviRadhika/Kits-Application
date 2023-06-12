from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class CroProtocolModel(db.Model):
    __tablename__ = "cro_protocol"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(db.String, unique=True)
    protocol_name = db.Column(db.String)
    sponsor_id = db.Column(UUID(as_uuid=True), db.ForeignKey("sponsor.sponsor_id"))
    cro_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro.cro_id"))
    no_of_sites = db.Column(db.Integer)
    total_patients = db.Column(db.Integer)
    no_of_screens = db.Column(db.Integer)
    # user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        return self.id
