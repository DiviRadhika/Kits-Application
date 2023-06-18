from db import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY


class ClabKitPreparationModel(db.Model):
    __tablename__ = "clab_kit_preparation"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro_protocol.id"))
    screening_kit_details = db.Column(JSONB)
    protocol_name = db.Column(db.String)
    visit_kit_details = db.Column(JSONB)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(protocol_id=id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
