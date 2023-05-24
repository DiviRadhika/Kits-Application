from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY

class LabKitModel(db.Model):
    __tablename__ = "kit_lab_test"
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    ckit_id = db.Column(db.String)
    kit_id = db.Column(db.String)
    kit_type = db.Column(db.String)
    lab_test_id =  db.Column(UUID(as_uuid=True), db.ForeignKey('labtest.lab_id'))
    no_of_visits = db.Column(db.String)
    frozen_status = db.Column(db.Boolean)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()