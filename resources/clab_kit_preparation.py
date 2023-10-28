from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.cro_protocol import CroProtocolModel
from models.site_data import SiteDataModel
from models.users import UserModel
from flask_jwt_extended import jwt_required, current_user, get_jwt


clab_kit_preparation_ns = Namespace(
    "clab_kit_preparation", description="clab_kit_preparation related operations"
)

kits_ns = Namespace(
    "kits_ns", description="kits_ns related operations"
)


kits_inventory_ns = Namespace(
    "kits_inventory_ns", description="kits_inventory_ns related operations"
)

clab_kit_preparations_ns = Namespace(
    "clab_kit_preparations", description="clab_kit_preparation related operations"
)

clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)

clab_screening_kit_details = clab_kit_preparation_ns.model(
    "screening_kit_details",
    {
        "ckitid": fields.String(required=True),
        "kitid": fields.String(required=True),
        "preparation": fields.String(required=True),
        "verificaton_status": fields.String(default="Not Verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection": fields.String(default="pending"),
        "acknowledgement": fields.String(),
        "remarks": fields.String(),
        "expiry_data": fields.String(),
        "pdf": fields.String(),
    },
)

clab_visit_kit_details = clab_kit_preparation_ns.model(
    "visit_meterial_details",
    {
        "ckitid": fields.String(required=True),
        "kitid": fields.String(required=True),
        "preparation": fields.String(required=True),
        "verification_status": fields.String(default="Not Verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection": fields.String(default="pending"),
        "acknowledgement": fields.String(),
        "remarks": fields.String(),
        "pdf": fields.String(),
        "expiry_data": fields.String(),
    },
)

pdf_details = clab_kit_preparation_ns.model(
    "pdf_details",
    {
        "row": fields.Integer(),
        "visit": fields.Integer(),
        "pdf": fields.String(),
    },
)

clab_kit_preparation = clab_kit_preparation_ns.model(
    "clab_kit_preparation",
    {
        "protocol_id": fields.String(required=True),
        "protocol_name": fields.String(required=True),
        "screening_kit_details": fields.List(fields.Nested(clab_screening_kit_details)),
        "visit_kit_details": fields.List(fields.Nested(clab_visit_kit_details)),
        "visit_pdf_details": fields.List(fields.Nested(pdf_details)),
        "screening_pdf_details": fields.List(fields.Nested(pdf_details)),
    },
)


class ClabKitPreparationList(Resource):
    @clab_kit_preparations_ns.doc("Get all the CLab Kit Preparations")
    @jwt_required(fresh=True)
    def get(resource):
        kits = ClabKitPreparationModel.find_all_with_entities()
        if len(kits) == 0:
            return {"data": [], "message": ""}
        response = {"data": []}
        for kit in kits:
            cro_data = CroProtocolModel.get_by_id(kit.protocol_id)
            if not cro_data:
                continue
            user_protocol_id = cro_data.protocol_id
            cro_kit_data = clab_kit_preparation_schema.dump(kit)
            cro_kit_data["user_protocol_id"] = user_protocol_id
            response["data"].append(cro_kit_data)

        # kits = clab_kit_list_preparation_schema.dump(ClabKitPreparationModel.find_all())
        return response, 200


class ClabKitProtocolActionsById(Resource):
    @clab_kit_preparations_ns.doc("get by id")
    @jwt_required(fresh=True)
    def get(self, cro_protocol_id):
        cro_kit_data = ClabKitPreparationModel.get_by_id(cro_protocol_id)
        if not cro_kit_data:
            return {"message": "cro data not found"}, 400
        cro_data = CroProtocolModel.get_by_id(cro_kit_data.protocol_id)
        response = {
            "data": clab_kit_preparation_schema.dump(cro_kit_data),
            "screen_count": cro_data.no_of_screens,
            "visit_count": cro_data.no_of_visits,
            "cro_name": cro_data.protocol_id,
        }
        return response, 200


class GetProtocolsBySiteId(Resource):
    @clab_kit_preparations_ns.doc("get protocols by site id")
    @jwt_required(fresh=True)
    def get(self, site_uuid):
        response = {
            "screening_data": [],
            "visit_data": [],
        }
        site_data = SiteDataModel.find_by_id(site_uuid)
        if not site_data:
            return {"message": "invalid site_id"}, 500
        site_id = site_data.site_data_code
        kits = ClabKitPreparationModel.find_all()

        for kit in kits:
            screening_kit_details = kit.screening_kit_details
            visit_kit_details = kit.visit_kit_details

            for screening_kit_data in screening_kit_details:
                if "site_id" in screening_kit_data:
                    if site_id == screening_kit_data["site_id"]:
                        cro_data = CroProtocolModel.get_by_id(kit.protocol_id)
                        if not cro_data:
                            continue
                        obj = {
                            "protocol_id": str(cro_data.id),
                            "user_protocol_id": cro_data.protocol_id,
                            "protocol_name": cro_data.protocol_name,
                            "creation_time": str(cro_data.created_on),
                            "expiry_date": "",
                        }
                        if "exprity_data" in screening_kit_data:
                            obj["expiry_date"] = (screening_kit_data["expiry_data"],)
                        response["screening_data"].append(obj)
                        break

            for visits in visit_kit_details:
                for visit_kit_data in visits:
                    if "site_id" in visit_kit_data:
                        if site_id == visit_kit_data["site_id"]:
                            cro_data = CroProtocolModel.get_by_id(kit.protocol_id)
                            if not cro_data:
                                continue
                            obj = {
                                "protocol_id": str(cro_data.id),
                                "user_protocol_id": cro_data.protocol_id,
                                "protocol_name": cro_data.protocol_name,
                                "creation_time": str(cro_data.created_on),
                                "expiry_date": "",
                            }
                            if "exprity_data" in visit_kit_data:
                                obj["expiry_date"] = (visit_kit_data["expiry_data"],)

                            response["visit_data"].append(obj)
                            break
        return response, 200


class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    @jwt_required(fresh=True)
    def post(self):
        clab_kit_prep_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(clab_kit_prep_json["protocol_id"])
        if kit_data:
            return {"message": "kit details already present in the db"}, 500
        if "visit_pdf_details" in clab_kit_prep_json:
            del clab_kit_prep_json["visit_pdf_details"]
        if "screening_pdf_details" in clab_kit_prep_json:
            del clab_kit_prep_json["screening_pdf_details"]
        try:
            clab_kit_prep_data = clab_kit_preparation_schema.load(clab_kit_prep_json)
            clab_kit_prep_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data{}".format(str(e))}, 500
        return {"data": [], "message": "success"}, 201

    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Update a CLab Kit Preparation")
    @jwt_required(fresh=True)
    def put(self):
        request_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(request_json["protocol_id"])
        if not kit_data:
            return {"message": "kit data not found"}, 500

        visit_pdf_details = request_json.get("visit_pdf_details", [])
        screeing_pdf_details = request_json.get("screening_pdf_details", [])

        if "visit_pdf_details" in request_json:
            del request_json["visit_pdf_details"]
        if "screening_pdf_details" in request_json:
            del request_json["screening_pdf_details"]

        screening_kit_details = request_json["screening_kit_details"]

        for pdf_details in screeing_pdf_details:
            for inner_pdf_details in pdf_details:
                for row_index in range(0, len(screening_kit_details)):
                    if inner_pdf_details["row"] == row_index:
                       #if 'pdf' not in screening_kit_detaiils:
                       #     screening_kit_details[row_index]["pdf"] = []

                        #screening_kit_details[row_index]["pdf"].append(inner_pdf_details["pdf"])
                        screening_kit_details[row_index]["pdf"] = inner_pdf_details["pdf"]


        visit_kit_details = request_json["visit_kit_details"]
        for pdf_details in visit_pdf_details:
            for pdf_detail in pdf_details:
                for visit_index in range(0, len(visit_kit_details)):  # outside index not useful
                    total_visit_details = visit_kit_details[visit_index]  # visit_index -> 0 
                    for row_index in range(0, len(total_visit_details)):  # total visits details visit-0, visit-1 ...etc
                        row_wise_data = total_visit_details[row_index]  # visit-0
                        if (
                            pdf_detail["visit"] == visit_index
                            and pdf_detail["row"] == row_index
                        ):
                            #if 'pdf' not in visit_kit_details[visit_index][row_index]:
                            #    visit_kit_details[visit_index][row_index]["pdf"] = []

                            #visit_kit_details[visit_index][row_index]["pdf"].append(pdf_detail["pdf"])
                            visit_kit_details[visit_index][row_index]["pdf"] = pdf_detail["pdf"]

        for key, value in request_json.items():
            if hasattr(kit_data, key) and value is not None:
                setattr(kit_data, key, value)
        try:
            kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update kit details{}".format(str(e))}, 500
        return {"message": "kit details updated successfully"}, 201


class KitsOperation(Resource):
    @kits_ns.doc("get protocols by site id")
    @jwt_required(fresh=True)
    def get(self, protocol_id, site_uuid):
        response = {
            "data": [],
        }
        site_data = SiteDataModel.find_by_id(site_uuid)
        if not site_data:
            return {"message": "invalid site_id"}, 500
        site_id = site_data.site_data_code
        kits = ClabKitPreparationModel.find_by_id(protocol_id)
        for kit in kits:
            screening_kit_details = kit.screening_kit_details
            visit_kit_details = kit.visit_kit_details

            for index in range(len(screening_kit_details)):
                screening_kit_data  = screening_kit_details[index]
                if "site_id" in screening_kit_data:
                    if site_id == screening_kit_data["site_id"]:
                        #d = dict((x, y) for x, y in screening_kit_data)
                        screening_kit_data["description"] = "screening-" + str(index)
                        response["data"].append(screening_kit_data)
                    
            for index in range(len(visit_kit_details)):
                visits = visit_kit_details[index]
                visit_number = "visit-" +str(index)
                for visit_kit_data in visits:
                    if "site_id" in visit_kit_data:
                        if site_id == visit_kit_data["site_id"]:
                            #d = dict((x, y) for x, y in visit_kit_data)
                            visit_kit_data["description"] = visit_number
                            response["data"].append(visit_kit_data)
        return response, 200



class KitsInventoryOperation(Resource):
    @kits_inventory_ns.doc("get protocols by site id")
    @jwt_required(fresh=True)
    def get(self, site_uuid):
        response = {
            "data": [],
        }
        site_data = SiteDataModel.find_by_id(site_uuid)
        if not site_data:
            return {"message": "invalid site_id"}, 500
        site_id = site_data.site_data_code
        kits = ClabKitPreparationModel.find_all()
        for kit in kits:
            cro_data = CroProtocolModel.get_by_id(kit.protocol_id)
            if not cro_data:
                continue

            screening_kit_details = kit.screening_kit_details
            visit_kit_details = kit.visit_kit_details
            obj = {
                "protocol_id": str(cro_data.protocol_id),
                "country": site_data.country,
                "state": site_data.region,
                "site": site_id,
                "description": "screening",
                "total_kits": 0,
                "pending_kits": 0,
                "shipped_kits": 0,
                "received_kits": 0,
                "onhand_kits": 0,
                "adjust_kits": 0,
                "last_shipped": 0,
                "last_shipped_data": "",
            }
            for screening_kit_data in screening_kit_details:
                if "site_id" in screening_kit_data:
                    if site_id == screening_kit_data["site_id"]:
                        obj["shipped_kits"] = obj["shipped_kits"] + 1
                        obj["total_kits"] = obj["total_kits"] + 1
                        if (
                            "siteStatus" in screening_kit_data
                            and screening_kit_data["siteStatus"] != "Not-Received"
                        ):
                            obj["received_kits"] = obj["received_kits"] + 1
                            if (
                                "patientId" not in screening_kit_data
                                or screening_kit_data["patientId"] == ""
                            ):
                                obj["onhand_kits"] = obj["onhand_kits"] + 1
                        else:
                            obj["pending_kits"] = obj["pending_kits"] + 1
            response["data"].append(obj)

            for index in range(len(visit_kit_details)):
                obj = {
                    "protocol_id": str(cro_data.protocol_id),
                    "country": site_data.country,
                    "state": site_data.region,
                    "site": site_id,
                    "description": "visit-" + str(index),
                    "total_kits": 0,
                    "pending_kits": 0,
                    "shipped_kits": 0,
                    "received_kits": 0,
                    "onhand_kits": 0,
                    "adjust_kits": 0,
                    "last_shipped": 0,
                    "last_shipped_data": "",
                }
                visits = visit_kit_details[index]
                for visit_kit_data in visits:
                    if "site_id" in visit_kit_data:
                        if site_id == visit_kit_data["site_id"]:
                            obj["shipped_kits"] = obj["shipped_kits"] + 1
                            obj["total_kits"] = obj["total_kits"] + 1
                            if (
                                "siteStatus" in visit_kit_data
                                and visit_kit_data["siteStatus"] != "Not-Received"
                            ):
                                obj["received_kits"] = obj["received_kits"] + 1
                                if (
                                    "patientId" not in visit_kit_data
                                    or visit_kit_data["patientId"] == ""
                                ):
                                    obj["onhand_kits"] = obj["onhand_kits"] + 1
                            else:
                                obj["pending_kits"] = obj["pending_kits"] + 1
                response["data"].append(obj)
        return response, 200

