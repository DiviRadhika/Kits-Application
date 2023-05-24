from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.lab_kit_details import LabKitModel
from schemas.lab_kit_details import LabKitSchema
import json


clab_kit_preparation_ns = Namespace("clab_kit_preparation", description="clab_kit_preparation related operations")
clab_kit_preparations_ns = Namespace("clab_kit_preparations", description="clab_kit_preparation related operations")
#lab_kit_ns = Namespace("lab_kit", description="kit related operations")
#lab_kits_ns = Namespace("lab_kits", description="kits related operations")


clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)
lab_kit_schema = LabKitSchema()
lab_kits_schema = LabKitSchema(many=True)

data_fields = clab_kit_preparation_ns.model(
    "visit_kit_details",
    {
        "ckit_id": fields.String(required=True),
        "no_of_visits": fields.String(required=True),
        "kit_type": "Visit",
        "lab_id": fields.String(required=True)
    }
)


lab_test_data_fields = clab_kit_preparation_ns.model(
    "lab_test_kit_details",
    {
        "ckit_id": fields.String(required=True),
        "kit_type": "Screen",
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

"""
lab_kit = lab_kit_ns.model(
    "lab_kit",
    {
        "ckit_id": fields.String(required=False),
        "kit_id": fields.String(required=True),
        "kit_type": fields.String(required=True),
        "lab_test_id": fields.String(required=True),
        "no_of_visits": fields.String(required=False),
        "preparation": fields.String(required=True),
        "status": fields.String(required=True),  
        "frozen_status": fields.Boolean(required=False)
    },
)
"""

class ClabKitPreparationList(Resource):
    @clab_kit_preparations_ns.doc("Get all the CLab Kit Preparations")
    def get(self):
        return (clab_kit_list_preparation_schema.dump(ClabKitPreparationModel.find_all()), 200)


class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    def post(self):
        clab_kit_prep_json = request.get_json()
        print(clab_kit_prep_json)

        try:
            clab_kit_prep_data = clab_kit_preparation_schema.load(clab_kit_prep_json)
            clab_kit_prep_data.save_to_db()


        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        try:
            for i in range(len(clab_kit_prep_json['visit_kit_details'])):
                sn = i+1
                visit_kit_type = clab_kit_prep_json['visit_kit_details'][i]['kit_type']
                visit_kit_ckit_id = clab_kit_prep_json['visit_kit_details'][i]['ckit_id']
                visit_kit_id = clab_kit_prep_json['protocol_id']+clab_kit_prep_json['visit_kit_details'][i]['kit_type']+str(sn)
                no_of_visits = clab_kit_prep_json['visit_kit_details'][i]['no_of_visits']
                visit_kit_lab_id = clab_kit_prep_json['visit_kit_details'][i]['lab_id']
                lab_kit_visit_data_dict = {"ckit_id":visit_kit_ckit_id, "kit_id": visit_kit_id, "kit_type": visit_kit_type, "lab_test_id":visit_kit_lab_id, "no_of_visits":no_of_visits}
                lab_kit_visit_data_json = json.dumps(lab_kit_visit_data_dict)
                lab_kit_visit_data = lab_kit_schema.load(json.loads(lab_kit_visit_data_json))
                lab_kit_visit_data.save_to_db()
            
            for i in range(len(clab_kit_prep_json['screening_kit_lab_test_details'])):
                sn = i + 1
                screen_kit_id = clab_kit_prep_json['protocol_id']+clab_kit_prep_json['screening_kit_lab_test_details'][0]['kit_type']+str(sn)
                screening_kit_type = clab_kit_prep_json['screening_kit_lab_test_details'][0]['kit_type']
                screening_lab_test_id = clab_kit_prep_json['screening_kit_lab_test_details'][i]['lab_test_id']
                screening_lab_test_ckit_id = clab_kit_prep_json['screening_kit_lab_test_details'][i]['ckit_id']
                screening_frozen_status = clab_kit_prep_json['screening_kit_lab_test_details'][i]['frozen_status']
                
                lab_kit_screening_data_dict = {"ckit_id":screening_lab_test_ckit_id, "kit_id": screen_kit_id, "kit_type": screening_kit_type, "lab_test_id":screening_lab_test_id, "frozen_status":screening_frozen_status}
                lab_kit_screening_data_json = json.dumps(lab_kit_screening_data_dict)
                lab_kit_screening_data = lab_kit_schema.load(json.loads(lab_kit_screening_data_json))
                lab_kit_screening_data.save_to_db()
        
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        
        return {"data": [], "message": "success"}, 201
    
    """@cro_protocol_ns.doc("Update a cro protocol")
    @cro_protocol_ns.expect(cro_protocol)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
