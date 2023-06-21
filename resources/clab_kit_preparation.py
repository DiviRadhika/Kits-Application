from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.cro_protocol import CroProtocolModel
from models.clab_screeing_kit import ClabscreeningKitDetailsModel
from models.clab_visit_kit import ClabvisitKitDetailsModel
from schemas.clab_visit_kit import ClabvisitKitDetailsSchema
from schemas.clab_screening_kit import ClabscreeingKitDetailsSchema


clab_kit_preparation_ns = Namespace(
    "clab_kit_preparation", description="clab_kit_preparation related operations"
)

clab_kit_preparations_ns = Namespace(
    "clab_kit_preparations", description="clab_kit_preparation related operations"
)

clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)
clab_screening_kit_detail_schema = ClabscreeingKitDetailsSchema()
clab_screening_kit_details_schema = ClabscreeingKitDetailsSchema(many=True)
clab_visit_kit_detail_schema = ClabvisitKitDetailsSchema()
clab_visit_kit_details_schema = ClabvisitKitDetailsSchema(many=True)


clab_screening_kit_details = clab_kit_preparation_ns.model(
    "screening_kit_details",
    {
        "ckit_id": fields.String(required=True),
        "kit_id": fields.String(required=True),
        "preparation_status": fields.String(required=True),
        "verificaton_status": fields.String(default="not_verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection_status": fields.String(default="pending"),
        "site_id": fields.String(),
        "remarks": fields.String(),
        "pdf_data": fields.String(),
    },
)

clab_visit_kit_details = clab_kit_preparation_ns.model(
    "visit_meterial_details",
    {
        "ckit_id": fields.String(required=True),
        "kit_id": fields.String(required=True),
        "preparation_status": fields.String(required=True),
        "verificaton_status": fields.String(default="not_verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection_status": fields.String(default="pending"),
        "site_id": fields.String(),
        "remarks": fields.String(),
        "pdf_data": fields.String(),
    },
)

clab_kit_preparation = clab_kit_preparation_ns.model(
    "clab_kit_preparation",
    {
        "protocol_id": fields.String(required=True),
        "protocol_name": fields.String(required=True),
        "screening_kit_details": fields.List(fields.Nested(clab_screening_kit_details)),
        "visit_kit_details": fields.List(fields.Nested(clab_visit_kit_details)),
    },
)

def getkits(all, protocol_id):
        response = {
            "data": []
        }
        kits = []
        if all == True:
            kits = ClabKitPreparationModel.find_all()
        else:
            kit = ClabKitPreparationModel.get_by_id(protocol_id)
            kits.append(kit)
        
        for kit in kits:
            cro_data = ClabscreeningKitDetailsModel(kit.protocol_id)
            if not cro_data:
                continue
            kit_total_data = {
                "protocol_id": kit.protocol_id,
                "protocol_name": kit.protocol_name,
                "screen_count":  cro_data.no_of_screens,
                "visit_count":  cro_data.no_of_visits,
                "cro_name": cro_data.protocol_id,
                "user_protocol_id": cro_data.protocol_id
            }
            screening_kits = ClabscreeningKitDetailsModel.get_by_protocol_id(kit.protocol_id)
            if len(screening_kits) == 0:
                continue
            kit_total_data['screening_kit_details'] = ClabscreeingKitDetailsSchema.dump(screening_kits)
            visit_kits = ClabscreeningKitDetailsModel.get_by_protocol_id_and_group_by_visits(kit.protocol_id)
            if len(visit_kits) == 0:
                continue
            kit_total_data['visit_kit_details'] = ClabvisitKitDetailsSchema.dump(visit_kits)
            response['data'].append(kit_total_data)
        return response

class ClabKitPreparationList(Resource):
    @clab_kit_preparations_ns.doc("Get all the CLab Kit Preparations")
    def get(resource):
        return getkits(True, ""), 200
        

class ClabKitProtocolActionsById(Resource):
    @clab_kit_preparations_ns.doc("get by id")
    def get(self, cro_protocol_id):
        return getkits(False, cro_protocol_id), 200
        cro_kit_data = ClabKitPreparationModel.get_by_id(cro_protocol_id)
        if not cro_kit_data:
            return {"message": "cro data not found"}, 400
        
        cro_data = CroProtocolModel.get_by_id(cro_kit_data.protocol_id)
        response = {
            "data":  clab_kit_preparation_schema.dump(cro_kit_data),
            "screen_count":  cro_data.no_of_screens,
            "visit_count":  cro_data.no_of_visits,
            "cro_name": cro_data.protocol_id,
        }
        return response, 200
    def put(self, status):
        if status == None:
            return {"message": "status is required"}, 500
        if status == "verification":




class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    def post(self):
        request_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(request_json["protocol_id"])
        if kit_data:
            return {"message": "kit details already present in the db"}, 500
        clab_kit_json ={
            "protocol_id": request_json['protocol_id'],
            "protocol_name": request_json['protocol_name']
        }
        try:
            #insert into clab_kit_preparation table
            clab_kit_prep_data = clab_kit_preparation_schema.load(clab_kit_json)
            clab_kit_prep_data.save_to_db()
            
            #insert into clab_kit_screening_kit_details table
            screeing_kit_details  = request_json['screening_kit_details']
            for screeing_kit_detail in screeing_kit_details:
                clab_screeing_kit_json = {
                    "ckit_id": screeing_kit_detail['ckit_id'],
                    "kit_id": screeing_kit_detail['kit_id'],
                    "preparation_status": screeing_kit_detail['preparation_status'],
                    "verificaton_status": screeing_kit_detail['verificaton_status'],
                    "patient_id": screeing_kit_detail['patient_id'],
                    "site_id": screeing_kit_detail['site_id'],
                    "collection_status": screeing_kit_detail['collection_status'],
                    "site_id": screeing_kit_detail['site_id'],
                    "remarks": screeing_kit_detail['remarks'],
                    "pdf_data": screeing_kit_detail['pdf_data'],
                    "protocol_id": request_json['protocol_id'],
                }
                clab_screening_kit_data = clab_screening_kit_detail_schema.load(clab_screeing_kit_json)
                clab_screening_kit_data.save_to_db()
            
            #insert into clab_kit_visit_kit_details table
            total_visit_kit_details  = request_json['visit_kit_details']
            visit = 0
            for visit_kit_details in total_visit_kit_details:
                visit = visit + 1
                for visit_kit_detail in visit_kit_details:
                    clab_visit_kit_json = {
                        "ckit_id": visit_kit_detail['ckit_id'],
                        "kit_id": visit_kit_detail['kit_id'],
                        "preparation_status": visit_kit_detail['preparation_status'],
                        "verificaton_status": visit_kit_detail['verificaton_status'],
                        "patient_id": visit_kit_detail['patient_id'],
                        "site_id": visit_kit_detail['site_id'],
                        "collection_status": visit_kit_detail['collection_status'],
                        "site_id": visit_kit_detail['site_id'],
                        "remarks": visit_kit_detail['remarks'],
                        "pdf_data": visit_kit_detail['pdf_data'],
                        "protocol_id": request_json['protocol_id'],
                        "visit_no": "visit-" + str(visit),
                    }
                clab_visit_kit_data = clab_visit_kit_detail_schema.load(clab_visit_kit_json)
                clab_visit_kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Update a CLab Kit Preparation")
    def put(self):
        request_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(request_json["protocol_id"])
        if not kit_data:
            return {"message": "kit data not found"}, 500
        for key, value in request_json.items():
            if hasattr(kit_data, key) and value is not None:
                setattr(kit_data, key, value)
        try:
            kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update kit details"}, 500
        return {"message": "kit details updated successfully"}, 201
