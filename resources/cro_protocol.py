from flask_restx import Namespace, fields, Resource
from schemas.cro_protocol import CroProtocolSchema
from flask import request
from sqlalchemy import exc
from models.cro_protocol import CroProtocolModel


cro_protocol_ns = Namespace(
    "cro_protocol", description="cro protocol related operations"
)
cro_protocols_ns = Namespace(
    "cro_protocols", description="cro protocols related operations"
)

cro_protocol_schema = CroProtocolSchema()
cro_list_protocols_schema = CroProtocolSchema(many=True)

data_fields = cro_protocol_ns.model(
    "visit_kit_details",
    {
        "no_of_visits": fields.String(required=True),
        "kit_type": fields.String(required=True),
        "lab_id": fields.String(required=True),
    },
)


lab_test_data_fields = cro_protocol_ns.model(
    "lab_test_kit_details",
    {
        "lab_test_id": fields.String(required=True),
        "frozen_status": fields.Boolean(required=True),
    },
)

cro_protocol = cro_protocols_ns.model(
    "cro_protocol",
    {
        "protocol_id": fields.String(required=True),
        "sponsor_id": fields.String(required=True),
        "cro_id": fields.String(required=True),
        "no_of_sites": fields.Integer(required=True),
        "total_patients": fields.Integer(required=True),
        "site_ids": fields.List(fields.String(), required=True),
        "screening_kit_count": fields.Integer(required=True),
        "screening_kit_lab_test_details": fields.List(
            fields.Nested(lab_test_data_fields)
        ),
        "visit_kit_count": fields.Integer(required=True),
        "visit_kit_details": fields.List(fields.Nested(data_fields)),
    },
)


class CrosProtocolsList(Resource):
    @cro_protocols_ns.doc("Get all the cros protocols")
    def get(self):
        return (cro_list_protocols_schema.dump(CroProtocolModel.find_all()), 200)


class CroProtocol(Resource):
    @cro_protocol_ns.expect(cro_protocol)
    @cro_protocol_ns.doc("Create a cro_protocol")
    def post(self):
        cro_protocal_json = request.get_json()
        try:
            cro_protocal_data = cro_protocol_schema.load(cro_protocal_json)
            cro_protocal_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data {}".format(str(e))}, 500
        return {"data": [], "message": "success"}, 201

    """@cro_protocol_ns.doc("Update a cro protocol")
    @cro_protocol_ns.expect(cro_protocol)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
