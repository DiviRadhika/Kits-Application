from flask_restx import Namespace, fields, Resource
from models.lab_test import LabtestModel
from schemas.lab_test import LabtestSchema
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


lab_test_ns = Namespace("lab_test", description="lab_test related operations")
lab_tests_ns = Namespace("lab_tests", description="lab_tests related operations")

lab_test_schema = LabtestSchema()
lab_tests_schema = LabtestSchema(many=True)

lab_test = lab_tests_ns.model(
    "lab_test",
    {
        "lab_test": fields.String(required=True),
        "material": fields.String(required=True),
        "size": fields.String(required=True),
        "image": fields.String(required=True),
    },
)

update_lab_test = lab_tests_ns.model(
    "update_lab_test",
    {
        "lab_test_id": fields.String(required=True),
        "lab_test": fields.String(required=True),
        "material": fields.String(required=True),
        "size": fields.String(required=True),
        "image": fields.String(required=True),
    },
)


class LabtestssList(Resource):
    @lab_tests_ns.doc("Get all the lab_tests")
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
        return (lab_tests_schema.dump(LabtestModel.find_all()), 200)


class LabActionsById(Resource):
    @lab_test_ns.doc("get by id")
    def get(self, lab_test_id):
        try:
            data = LabtestModel.get_by_id(lab_test_id)
            if not data:
                return {"message": "lab test data not found"}, 400
            return (lab_test_schema.dump(data), 200)
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data"}, 500


class Labtest(Resource):
    @lab_test_ns.expect(lab_test)
    @lab_test_ns.doc("Create a lab_test")
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
        lab_test_json = request.get_json()
        try:
            lab_test_data = lab_test_schema.load(lab_test_json)
            lab_test_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    @lab_test_ns.expect(update_lab_test)
    @lab_test_ns.doc("Update a lab test")
    def put(self):
        request_json = request.get_json()
        try:
            lab_test_data = LabtestModel.get_by_id(request_json["lab_test_id"])
            if not lab_test_data:
                return {"message": "lab_test data not found"}, 500
            for key, value in request_json.items():
                if hasattr(lab_test_data, key) and value is not None:
                    setattr(lab_test_data, key, value)
            lab_test_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated lab test data successfully"}, 201
