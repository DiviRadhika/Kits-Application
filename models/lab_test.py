from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class LabtestModel(db.Model):
    __tablename__ = "lab_test"
    # extend_existing=True
    lab_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    lab_code = db.Column(db.String)
    lab_test = db.Column(db.String)
    material = db.Column(db.String)
    size = db.Column(db.String)
    image = db.Column(db.String)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
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