from flask_restx import Namespace, fields, Resource
from models.lab_test import LabtestModel
from schemas.lab_test import LabtestSchema
from flask import request
from sqlalchemy import exc


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


class LabtestssList(Resource):
    @lab_tests_ns.doc("Get all the lab_tests")
    def get(self):
        return (lab_tests_schema.dump(LabtestModel.find_all()), 200)


class Labtest(Resource):
    @lab_test_ns.expect(lab_test)
    @lab_test_ns.doc("Create a lab_test")
    def post(self):
        lab_test_json = request.get_json()
        try:
            lab_test_data = lab_test_schema.load(lab_test_json)
            lab_test_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    """@lab_test_ns.doc("Update a lab_test")
    @lab_test_ns.expect(lab_test)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
