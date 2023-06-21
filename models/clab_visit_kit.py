from db import db
from sqlalchemy.dialects.postgresql import UUID


class ClabvisitKitDetailsModel(db.Model):
    __tablename__ = "clab_visit_kit_details"
        # extend_existing=True
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kit_id = db.Column(db.String)
    ckit_id = db.Column(db.String)
    site_id = db.Column(db.String)
    remarks = db.Column(db.String)
    patient_id = db.Column(db.String)
    collection_status = db.Column(db.String)
    prepration_status = db.Column(db.String)
    acknowledgement = db.Column(db.String)
    verification_status= db.Column(db.String)
    visit_no = db.Column(db.String)
    pdf_data = db.Column(db.Text)
    protocol_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro_protocol.id"))

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_protocol_id(cls, protocol_id):
        return cls.query.filter_by(protocol_id=protocol_id).all()
    @classmethod
    def get_by_protocol_id_and_group_by_visits(cls, protocol_id):
        return (
            db.session.query(ClabvisitKitDetailsModel)
            .filter(ClabvisitKitDetailsModel.protocol_id == protocol_id)
            .group_by(ClabvisitKitDetailsModel.visit_no).all()
        )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
