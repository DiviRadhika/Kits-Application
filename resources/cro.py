from flask_restx import Namespace, fields, Resource
from schemas.cro import CroSchema
from flask import request
from sqlalchemy import exc
from models.cro import CroModel
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)

cro_ns = Namespace("cro", description="cro related operations")
cros_ns = Namespace("cros", description="cros related operations")


cro_schema = CroSchema()
cros_list_schema = CroSchema(many=True)

cro = cros_ns.model(
    "cro",
    {
        "cro_code": fields.String(required=True),
        "cro_name": fields.String(required=True),
        "legal_cro_name": fields.String(required=True),
        "address_1": fields.String(required=True),
        "address_2": fields.String(required=True),
        "address_3": fields.String(required=True),
        "address_4": fields.String(required=True),
        "city": fields.String(required=True),
        "district": fields.String(required=True),
        "region": fields.String(required=True),
        "zip_code": fields.String(required=True),
        "country": fields.String(required=True),
        "office_telephone": fields.String(required=True),
        "extension": fields.String(required=True),
        "email": fields.String(required=True),
        "website": fields.String(required=True),
    },
)

update_cro = cros_ns.model(
    "Updatecro",
    {
        "cro_id": fields.String(required=True),
        "cro_code": fields.String(required=True),
        "cro_name": fields.String(required=True),
        "legal_cro_name": fields.String(required=True),
        "address_1": fields.String(required=True),
        "address_2": fields.String(required=True),
        "address_3": fields.String(required=True),
        "address_4": fields.String(required=True),
        "city": fields.String(required=True),
        "district": fields.String(required=True),
        "region": fields.String(required=True),
        "zip_code": fields.String(required=True),
        "country": fields.String(required=True),
        "office_telephone": fields.String(required=True),
        "extension": fields.String(required=True),
        "email": fields.String(required=True),
        "website": fields.String(required=True),
    },
)


class CrosList(Resource):
    @cros_ns.doc("Get all the cros")
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
        return (cros_list_schema.dump(CroModel.find_all()), 200)


class CroActionsById(Resource):
    @cro_ns.doc("get by id")
    @jwt_required(fresh=True)
    def get(self, cro_id):
        userId = current_user.user_id
        user_data = UserModel.find_by_id(userId)
        getjt = get_jwt()
        if float(getjt["signin_seconds"]) != user_data.last_logged_in.timestamp():
            return {
                "message": "Not a valid Authorization token, logout and login again",
                "error": "not_authorized",
            }, 401
        try:
            cro_data = CroModel.get_by_id(cro_id)
            if not cro_data:
                return {"message": "cro data not found"}, 400
            return (cro_schema.dump(cro_data), 200)
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data"}, 500


class Cro(Resource):
    @cro_ns.expect(cro)
    @cro_ns.doc("Create a cro")
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
        cro_json = request.get_json()
        try:
            cro_data = cro_schema.load(cro_json)
            cro_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    @cro_ns.expect(update_cro)
    @cro_ns.doc("Update a cro")
    @jwt_required(fresh=True)
    def put(self):
        userId = current_user.user_id
        user_data = UserModel.find_by_id(userId)
        getjt = get_jwt()
        if float(getjt["signin_seconds"]) != user_data.last_logged_in.timestamp():
            return {
                "message": "Not a valid Authorization token, logout and login again",
                "error": "not_authorized",
            }, 401
        request_json = request.get_json()
        try:
            cro_data = CroModel.get_by_id(request_json["cro_id"])
            if not cro_data:
                return {"message": "cro data not found"}, 500
            for key, value in request_json.items():
                if hasattr(cro_data, key) and value is not None:
                    setattr(cro_data, key, value)
            cro_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated cro data successfully"}, 201