from db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid


class UserModel(db.Model):
    __tablename__ = "users"

    user_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    email = db.Column(db.String, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    logged_in_ip = db.Column(db.String)
    last_logged_in = db.Column(db.DateTime(timezone=False))
    password = db.Column(db.String)
    user_otp = db.Column(db.Integer)
    otp_sent_time = db.Column(db.DateTime(timezone=False))
    is_logged_in = db.Column(db.Boolean)
    status = db.Column(db.Boolean)
    access_token = db.Column(db.String)
    refresh_token = db.Column(db.String)



    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    

    def save_to_db(self):  # -> None:
        db.session.add(self)
        db.session.commit()
        return self.user_id