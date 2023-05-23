from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel


clab_kit_preparation_ns = Namespace("clab_kit_preparation", description="clab_kit_preparation related operations")
clab_kit_preparations_ns = Namespace("clab_kit_preparations", description="clab_kit_preparation related operations")

clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)

data_fields = clab_kit_preparation_ns.model(
    "visit_kit_details",
    {
        "no_of_visits": fields.String(required=True),
        "kit_type": fields.String(required=True),
        "lab_id": fields.String(required=True)
    }
)


lab_test_data_fields = clab_kit_preparation_ns.model(
    "lab_test_kit_details",
    {
        "lab_test_id": fields.String(required=True),
        "frozen_status": fields.Boolean(required=True),
    }
)

clab_kit_preparation = clab_kit_preparation_ns.model(
    "clab_kit_preparation",
    {
        "protocol_id": fields.String(required=True),
        "screening_kit_count": fields.Integer(required=True),
        "screening_kit_lab_test_details": fields.List(fields.Nested(lab_test_data_fields)),
        "visit_kit_count": fields.Integer(required=True),
        "visit_kit_details": fields.List(fields.Nested(data_fields)),
        "preparation": fields.String(required=True),
        "status": fields.String(required=True),  
        #"frozen_status": fields.List(fields.Nested(data_fields))
    },
)


class ClabKitPreparationList(Resource):
    @clab_kit_preparations_ns.doc("Get all the CLab Kit Preparations")
    def get(self):
        return (clab_kit_list_preparation_schema.dump(ClabKitPreparationModel.find_all()), 200)


class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    def post(self):
        clab_kit_prep_json = request.get_json()
        try:
            clab_kit_prep_data = clab_kit_preparation_schema.load(clab_kit_prep_json)
            clab_kit_prep_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201
    
    """@cro_protocol_ns.doc("Update a cro protocol")
    @cro_protocol_ns.expect(cro_protocol)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""