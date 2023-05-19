from flask_restx import Namespace, fields, Resource
from schemas.cro_protocol import CroProtocolSchema
from flask import request
from sqlalchemy import exc

cro_protocol_ns = Namespace("cro_protocol", description="cro protocol related operations")
cros_protocols_ns = Namespace("cros_protocols", description="cros protocols related operations")

cro_protocol_schema = CroProtocolSchema()
cros_list_protocols_schema = CroProtocolSchema(many=True)

cro_protocol = cros_protocols_ns.model(
    "cro_protocol",
    {
        "protocolId": fields.String(required=True),
        "request_id": fields.String(required=True),
        "croid": fields.String(required=True),
        "no_of_sites": fields.Integer(required=True),
        "total_patients": fields.Integer(required=True),
        "site_ids": fields.List(fields.String(), required=True),
        "screening_kit_count": fields.Integer(required=True),
        "screening_kit_lab_tests": fields.String(required=True),
        "visit_kit_count": fields.Integer(required=True),
        "visit_kit_details": fields.DictItem(attribute="visit_kit_details", required=True),
        "created_by": fields.String(required=True),
        "created_on": fields.String(required=True),
        "changed_by": fields.String(required=True),
        "changed_on": fields.String(required=True),
    },
)


class CrosProtocolsList(Resource):
    @cros_protocols_ns.doc("Get all the cros protocols")
    def get(self):
        return {"data": [], "message": "success"}, 200


class CroProtocol(Resource):
    @cro_protocol_ns.expect(cro)
    @cro_protocol_ns.doc("Create a cro protocol")
    def post(self):
        def post(self):
            cro_protocol_json = request.get_json("cro_protocol_json")
        try:
            cro_protocol_data = cro_protocol_schema.load()
            cro_protocol_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201
    
    @cro_protocol_ns.doc("Update a cro protocol")
    @cro_protocol_ns.expect(cro_protocol)
    def put(self):
        return {"data": [], "message": "updated"}, 200
