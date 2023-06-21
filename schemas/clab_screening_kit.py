from ma import ma
from models.clab_screeing_kit import ClabscreeningKitDetailsModel


class ClabscreeingKitDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClabscreeningKitDetailsModel
        load_instance = True
        include_fk = True
