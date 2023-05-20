from flask_restx import Namespace, fields, Resource
from schemas.cro import CroSchema
from flask import request
from sqlalchemy import exc

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


class CrosList(Resource):
    @cros_ns.doc("Get all the cros")
    def get(self):
        return {"data": [], "message": "success"}, 200


class Cro(Resource):
    @cro_ns.expect(cro)
    @cro_ns.doc("Create a cro")
    def post(self):
        def post(self):
            request.get_json(cro_json)

        try:
            cro_data = cro_schema.load()
            cro_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    """@cro_ns.doc("Update a cro")
    @cro_ns.expect(cro)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
