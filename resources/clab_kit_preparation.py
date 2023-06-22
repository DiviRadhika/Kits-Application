from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.cro_protocol import CroProtocolModel


clab_kit_preparation_ns = Namespace(
    "clab_kit_preparation", description="clab_kit_preparation related operations"
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
    },
)

pdf_details = clab_kit_preparation_ns.model(
  "pdf_details",{
      "row": fields.String(required=True),
      "visit": fields.String(),
      "pdf": fields.String(),
    }
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
    def get(resource):
        kits = ClabKitPreparationModel.find_all()
        if len(kits) == 0:
            return {"data": [], "message": ""}
        response = {
            "data": []
        }
        for kit in kits:
            cro_data = CroProtocolModel.get_by_id(kit.protocol_id)
            if not cro_data:
                continue
            user_protocol_id = cro_data.protocol_id
            cro_kit_data = clab_kit_preparation_schema.dump(kit)
            cro_kit_data['user_protocol_id'] = user_protocol_id
            response['data'].append(cro_kit_data)

        #kits = clab_kit_list_preparation_schema.dump(ClabKitPreparationModel.find_all())
        return response, 200


class ClabKitProtocolActionsById(Resource):
    @clab_kit_preparations_ns.doc("get by id")
    def get(self, cro_protocol_id):
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


class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    def post(self):
        clab_kit_prep_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(clab_kit_prep_json["protocol_id"])
        if kit_data:
            return {"message": "kit details already present in the db"}, 500
        if 'visit_pdf_details' in clab_kit_prep_json:
            del clab_kit_prep_json["visit_pdf_details"]
        if 'screening_pdf_details' in clab_kit_prep_json:
            del clab_kit_prep_json["screening_pdf_details"]
        try:
            clab_kit_prep_data = clab_kit_preparation_schema.load(clab_kit_prep_json)
            clab_kit_prep_data.save_to_db()
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
        
        visit_pdf_details = request_json.get('visit_pdf_details', [])
        screeing_pdf_details = request_json.get('screening_pdf_details', [])

        if 'visit_pdf_details' in request_json:
            del(request_json['visit_pdf_details'])
        if 'screening_pdf_details' in request_json:
            del(request_json['screening_pdf_details'])

        for pdf_details in screeing_pdf_details:
            for index in range(0, len(request_json['screening_kit_details'])):
                if pdf_details.row == str(index):
                    screeing_pdf_details[index]['pdf'] = pdf_details.pdf
        
        for key, value in request_json.items():
            if hasattr(kit_data, key) and value is not None:
                setattr(kit_data, key, value)
        try:
            kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update kit details"}, 500
        return {"message": "kit details updated successfully"}, 201
