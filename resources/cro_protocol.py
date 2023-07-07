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
from models.screening_kit import ScreeningKitDetailsModel
from models.visit_kit import VisitKitDetailsModel
from schemas.screening_kit import ScreeningKitDetailsSchema
from schemas.visit_kit import VisitKitDetailsSchema
from models.lab_test import LabtestModel
from models.meterial import MeterialModel

cro_protocol_ns = Namespace(
    "cro_protocol", description="cro protocol related operations"
)
cro_protocols_ns = Namespace(
    "cro_protocols", description="cro protocols related operations"
)

cro_protocol_schema = CroProtocolSchema()
cro_list_protocols_schema = CroProtocolSchema(many=True)
screening_kit_details_schema = ScreeningKitDetailsSchema()
multi_screening_kit_details_schema = ScreeningKitDetailsSchema(many=True)
visit_kit_details_schema = VisitKitDetailsSchema()
multi_visit_kit_details_schema = VisitKitDetailsSchema(many=True)


meterial_details = cro_protocol_ns.model(
    "meterial_kit_details",
    {
        "meterial_id": fields.String(required=True),
        "meterial_name": fields.String(),
        "size": fields.String(required=True),
        "frozen_status": fields.Boolean(required=True),
        "image": fields.String(required=True),
        "quantity": fields.Integer(required=True),
    },
)

screening_kit_details = cro_protocol_ns.model(
    "screening_kit_details",
    {
        # "visit_no": fields.Integer(required=True),
        "screening_kit_count": fields.Integer(required=True),
        "lab_test_ids": fields.List(fields.String(required=True)),
        "meterial_details": fields.List(fields.Nested(meterial_details)),
    },
)

visite_meterial_details = cro_protocol_ns.model(
    "visit_meterial_details",
    {
        "visits": fields.List(fields.Nested(meterial_details)),
        "selected_lab_tests": fields.List(fields.String(required=True)),
    },
)

visit_kit_details = cro_protocol_ns.model(
    "visit_kit_details",
    {
        # "visit_no": fields.Integer(required=True),
        "visit_kit_count": fields.Integer(required=True),
        "meterial_details": fields.List(fields.Nested(visite_meterial_details)),
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
        "global_sample_size": fields.Integer(required=True),
        "avant_sample_size": fields.Integer(required=True),
        "screening_kit_details": fields.List(fields.Nested(screening_kit_details)),
        "visit_kit_details": fields.List(fields.Nested(visit_kit_details)),
    },
)


class CrosProtocolsList(Resource):
    @cro_protocols_ns.doc("Get all the cros protocols")
    def get(self):
        return (cro_list_protocols_schema.dump(CroProtocolModel.find_all()), 200)


class CroProtocolBySponsorId(Resource):
    @cro_protocols_ns.doc("get by sponsor id")
    def get(self, sponsor_id):
        return (
            cro_list_protocols_schema.dump(
                CroProtocolModel.get_by_sponsor_id(sponsor_id)
            ),
            200,
        )


class CroProtocolActionsById(Resource):
    @cro_protocol_ns.doc("get by id")
    def get(self, cro_protocol_id):
        try:
            cro_data = CroProtocolModel.get_by_id(cro_protocol_id)
            if not cro_data:
                return {"message": "cro data not found"}, 400

            response = {}
            cro_dump_data = cro_protocol_schema.dump(cro_data)
            cro_protocol_id = cro_data.id
            screening_kit_details = ScreeningKitDetailsModel.get_by_protocol_id(
                cro_protocol_id
            )
            if not screening_kit_details:
                response["screening_kit_details"] = []

            lab_test_names = []
            for screening_kit_detail in screening_kit_details:
                lab_test_ids = screening_kit_detail.lab_test_ids

                for lab_test in lab_test_ids:
                    lab_data = LabtestModel.get_by_id(lab_test)
                    if lab_data:
                        lab_test_names.append(lab_data.name)

                screening_kit_detail.lab_test_ids = lab_test_names

            updated_screeing_kit_details = multi_screening_kit_details_schema.dump(
                screening_kit_details
            )

            response["screening_kit_details"] = updated_screeing_kit_details

            visit_kit_details = VisitKitDetailsModel.get_by_protocol_id(cro_protocol_id)
            if not visit_kit_details:
                response["visit_kit_details"] = []

            # visit_lab_test_names = []
            # for visit_kit_detail in visit_kit_details:
            #    lab_test_ids = visit_kit_detail.lab_test_ids

            #   for lab_test in lab_test_ids:
            #      lab_data = LabtestModel.get_by_id(lab_test)
            #      visit_lab_test_names.append(lab_data.name)

            # visit_kit_detail.lab_test_ids = visit_lab_test_names

            response["visit_kit_details"] = multi_visit_kit_details_schema.dump(
                visit_kit_details
            )
            response["protocol"] = cro_dump_data
            return response, 200
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data{}".format(str(e))}, 500


class CroProtocol(Resource):
    @cro_protocol_ns.expect(cro_protocol)
    @cro_protocol_ns.doc("Create a cro_protocol")
    # @jwt_required(fresh=True)
    def post(self):
        request_json = request.get_json()
        protocol_data = CroProtocolModel.get_by_protocol_id(request_json["protocol_id"])
        if protocol_data:
            return {"message": "protocol already exists"}, 500
        cro_protocol_json = {
            "protocol_id": request_json["protocol_id"],
            "protocol_name": request_json["protocol_name"],
            "sponsor_id": request_json["sponsor_id"],
            "cro_id": request_json["cro_id"],
            "no_of_visits": request_json["no_of_visits"],
            "no_of_screens": request_json["no_of_screens"],
        }
        try:
            cro_protocol_data = cro_protocol_schema.load(cro_protocol_json)
            cro_protocol_id = cro_protocol_data.save_to_db()
            screening_kit_details = request_json["screening_kit_details"]
            for item in screening_kit_details:
                meterial_details = item["meterial_details"]
                for meterial in meterial_details:
                    meterial_data = MeterialModel.get_by_id(meterial["meterial_id"])
                    if meterial_data:
                        meterial["meterial_name"] = meterial_data.name

                screening_item_json = {
                    "lab_test_ids": item["lab_test_ids"],
                    "meterial_details": item["meterial_details"],
                    "protocol_id": cro_protocol_id,
                    # "visit_no": item['visit_no'],
                    "screening_kit_count": item["screening_kit_count"],
                }
                screening_kit_data = screening_kit_details_schema.load(
                    screening_item_json
                )
                screening_kit_data.save_to_db()
            # loop over visit_kit_details and prepare visit_item_json and then load to visit_kit_details and save_to_db
            visit_kit_details = request_json["visit_kit_details"]
            for item in visit_kit_details:
                #    import pdb; pdb.set_trace()
                #    meterial_details = item["meterial_details"]
                #    for meterial in meterial_details:
                #        meterial_data = MeterialModel.get_by_id(meterial['meterial_id'])
                #        if meterial_data:
                #            meterial['meterial_name'] = meterial_data.name

                visit_item_json = {
                    "protocol_id": cro_protocol_id,
                    "visit_kit_count": item["visit_kit_count"],
                    # "lab_test_ids": item["lab_test_ids"],
                    # "visit_no": item['visit_no'],
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
