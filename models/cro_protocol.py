from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY


class CroProtocolModel(db.Model):
    __tablename__ = "cro_protocol"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(db.String)
    sponsor_id = db.Column(UUID(as_uuid=True), db.ForeignKey('sponsor.sponsor_id'))
    cro_id =  db.Column(UUID(as_uuid=True), db.ForeignKey('cro.cro_id'))
    no_of_sites = db.Column(db.Integer)
    total_patients = db.Column(db.Integer)
    site_ids = db.Column(ARRAY(db.String))
    screening_kit_count  = db.Column(db.Integer)
    screening_kit_lab_test_details = db.Column(ARRAY(UUID(as_uuid=True)))
    visit_kit_count = db.Column(db.Integer)
    visit_kit_details = db.Column(JSONB)
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

