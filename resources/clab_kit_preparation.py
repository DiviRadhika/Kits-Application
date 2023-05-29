from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


clab_kit_preparation_ns = Namespace(
    "clab_kit_preparation", description="clab_kit_preparation related operations"
)
clab_kit_preparations_ns = Namespace(
    "clab_kit_preparations", description="clab_kit_preparation related operations"
)

clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)


data_fields = clab_kit_preparation_ns.model(
    "visit_kit_details",
    {
        "no_of_visits": fields.String(required=True),
        "kit_type": fields.String(required=True),
        "lab_id": fields.String(required=True),
    },
)


lab_test_data_fields = clab_kit_preparation_ns.model(
    "screening_kit_details",
    {
        "lab_test_id": fields.String(required=True),
        "kid_id": fields.String(required=True),
        "preparation": fields.String(required=True),
        "status": fields.String(default="not Verified"),
        "assigned_to_site": fields.String(),
    },
)

clab_kit_preparation = clab_kit_preparation_ns.model(
    "clab_kit_preparation",
    {
        "protocol_id": fields.String(required=True),
        "screening_kit_count": fields.Integer(required=True),
        "screening_kit_lab_test_details": fields.List(
            fields.Nested(lab_test_data_fields)
        ),
        "visit_kit_count": fields.Integer(required=True),
        "visit_kit_details": fields.List(fields.Nested(data_fields)),
        "preparation": fields.String(required=True),
        "status": fields.String(required=True),
    },
)


class ClabKitPreparationList(Resource):
    @clab_kit_preparations_ns.doc("Get all the CLab Kit Preparations")
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
        return (
            clab_kit_list_preparation_schema.dump(ClabKitPreparationModel.find_all()),
            200,
        )


class ClabKitPreparation(Resource):
    @clab_kit_preparation_ns.expect(clab_kit_preparation)
    @clab_kit_preparation_ns.doc("Create a CLab Kit Preparation")
    @jwt_required(fresh=True)
    def post(self):
        userId = current_user.user_id
        user_data = UserModel.find_by_id(userId)
        getjt = get_jwt()
        if float(getjt["signin_seconds"]) != user_data.last_logged_in.timestamp():
            return {
                "message": "Not a valid Authorization token, logout and login again",
                "error": "not_authorized",
            }, 401
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
