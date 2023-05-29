from db import db
import uuid
from sqlalchemy.dialects.postgresql import UUID


class VisitKitDetailsModel(db.Model):
    __tablename__ = "visit_kit_details"
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro_protocol.id"))
    visit_kit_count = db.Column(db.Integer)
    visit_kit_type = db.Column(db.String)
    no_of_visits = db.Column(db.String)
    kit_type = db.Column(db.String)
    lab_test_id = db.Column(UUID(as_uuid=True), db.ForeignKey("lab_test.lab_id"))
    lab_frozen_status = db.Column(db.Boolean)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
