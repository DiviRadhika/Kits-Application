from ma import ma
from models.clab_visit_kit import ClabvisitKitDetailsModel


class ClabvisitKitDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClabvisitKitDetailsModel
        load_instance = True
        include_fk = True
