from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY


class ClabKitPreparationModel(db.Model):
    __tablename__ = "clab_kit_preparation"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(db.String, db.ForeignKey('cro_protocol.protocol_id'))
    screening_kit_count  = db.Column(db.Integer)
    screening_kit_lab_test_details = db.Column(JSONB)
    visit_kit_count = db.Column(db.Integer)
    visit_kit_details = db.Column(JSONB)
    preparation = db.Column(db.String)
    status = db.Column(db.String, default="Not Verified")
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

