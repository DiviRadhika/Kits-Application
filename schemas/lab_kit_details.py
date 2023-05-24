from ma import ma
from models.lab_kit_details import LabKitModel


class LabKitSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LabKitModel
        load_instance = True
        include_fk = True