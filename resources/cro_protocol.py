from flask_restx import Namespace, fields, Resource
from schemas.cro_protocol import CroProtocolSchema
from flask import request
from sqlalchemy import exc
from models.cro_protocol import CroProtocolModel
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)
from schemas.screening_kit import ScreeningKitDetailsSchema
from schemas.visit_kit import VisitKitDetailsSchema

cro_protocol_ns = Namespace(
    "cro_protocol", description="cro protocol related operations"
)
cro_protocols_ns = Namespace(
    "cro_protocols", description="cro protocols related operations"
)

cro_protocol_schema = CroProtocolSchema()
cro_list_protocols_schema = CroProtocolSchema(many=True)
screening_kit_details_schema = ScreeningKitDetailsSchema()
visit_kit_details_schema = VisitKitDetailsSchema()


meterial_details = cro_protocol_ns.model(
    "meterial_kit_details",
    {
        "meterial_id": fields.String(required=True),
        "size": fields.String(required=True),
        "frozen_status": fields.String(required=True),
        "quantity": fields.Integer(required=True),
    },
)

screening_kit_details = cro_protocol_ns.model(
    "screening_kit_details",
    {
        "screening_kit_count": fields.Integer(required=True),
        "lab_test_ids": fields.List(fields.String(required=True)),
        "meterial_details": fields.List(fields.Nested(meterial_details)),
    },
)

visit_kit_details = cro_protocol_ns.model(
    "visit_kit_details",
    {
        "visit_kit_count": fields.Integer(required=True),
        "lab_test_ids": fields.List(fields.String(required=True)),
        "meterial_details": fields.List(fields.Nested(meterial_details)),
    },
)
cro_protocol = cro_protocols_ns.model(
    "cro_protocol",
    {
        "protocol_id": fields.String(required=True),
        "protocol_name": fields.String(required=True),
        "sponsor_id": fields.String(required=True),
        "cro_id": fields.String(required=True),
        "no_of_visits": fields.Integer(required=True),
        "no_of_screens": fields.Integer(required=True),
        "total_patients": fields.Integer(required=True),
        "screening_kit_details": fields.List(fields.Nested(screening_kit_details)),
        "visit_kit_details": fields.List(fields.Nested(visit_kit_details)),
    },
)


class CrosProtocolsList(Resource):
    @cro_protocols_ns.doc("Get all the cros protocols")
    @jwt_required(fresh=True)
    def get(self):
        userId = current_user.user_id
        user_data = UserModel.find_by_id(userId)
        getjt = get_jwt()
        if float(getjt["signin_seconds"]) != user_data.last_logged_in.timestamp():
            return {
                "message": "Not a valid Authorization token, logout and login again",
                "error": "not_authorized",
            }, 401
        return (cro_list_protocols_schema.dump(CroProtocolModel.find_all()), 200)


class CroProtocol(Resource):
    @cro_protocol_ns.expect(cro_protocol)
    @cro_protocol_ns.doc("Create a cro_protocol")
    # @jwt_required(fresh=True)
    def post(self):
        request_json = request.get_json()
        cro_protocol_json = {
            "protocol_id": request_json["protocol_id"],
            "protocol_name": request_json["protocol_name"],
            "sponsor_id": request_json["sponser_id"],
            "cro_id": request_json["cro_id"],
            "no_of_visits": request_json["no_of_visits"],
            "total_patients": request_json["total_patients"],
            "no_of_screens": request_json["no_of_screens"],
        }
        try:
            cro_protocol_data = cro_protocol_schema.load(cro_protocol_json)
            cro_protocol_id = cro_protocol_data.save_to_db()
            screening_kit_details = request_json["screening_kit_details"]
            for item in screening_kit_details:
                screening_item_json = {
                    "lab_test_ids": item["lab_test_ids"],
                    "meterial_details": item["meterial_details"],
                    "protocol_id": cro_protocol_id,
                    "screening_kit_count": request_json["screening_kit_count"],
                }
                screening_kit_data = screening_kit_details_schema.load(
                    screening_item_json
                )
                screening_kit_data.save_to_db()
            # loop over visit_kit_details and prepare visit_item_json and then load to visit_kit_details and save_to_db
            visit_kit_details = request_json["visit_kit_details"]
            for item in visit_kit_details:
                visit_item_json = {
                    "protocol_id": cro_protocol_id,
                    "visit_kit_count": request_json["visit_kit_count"],
                    "lab_test_ids": item["lab_test_ids"],
                    "meterial_details": item["meterial_details"],
                }
                visit_kit_data = visit_kit_details_schema.load(visit_item_json)
                visit_kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data {}".format(str(e))}, 500
        return {"data": [], "message": "success"}, 201

    """@cro_protocol_ns.doc("Update a cro protocol")
    @cro_protocol_ns.expect(cro_protocol)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
