from flask_restx import Namespace, fields, Resource
from schemas.sponsor import SponsorSchema
from models.sponsor import SponsorModel
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


sponsor_ns = Namespace("sponsor", description="Sponsor related operations")
sponsors_ns = Namespace("sponsors", description="Sponsors related operations")

sponsor_schema = SponsorSchema()
sponsors_list_schema = SponsorSchema(many=True)

sponsor = sponsor_ns.model(
    "sponsor",
    {
        "sponsor_code": fields.String(required=True),
        "sponsor_name": fields.String(required=True),
        "legal_sponsor_name": fields.String(required=True),
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


class SponsersList(Resource):
    @sponsors_ns.doc("Get all the sponsers")
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
        return (sponsors_list_schema.dump(SponsorModel.find_all()), 200)


class Sponser(Resource):
    @sponsor_ns.expect(sponsor)
    @sponsor_ns.doc("Create a sponser")
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
        sponsor_json = request.get_json()
        try:
            sponser_data = sponsor_schema.load(sponsor_json)
            sponser_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data {}".format(str(e))}, 500
        return {"data": [], "message": "created sponser data successfully"}, 201

    """@sponsor_ns.doc("Update a sponser")
    @sponsor_ns.expect(sponsor)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
