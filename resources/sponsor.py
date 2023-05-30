from flask_restx import Namespace, fields, Resource
from schemas.sponsor import SponsorSchema
from models.sponsor import SponsorModel
from flask import request
from sqlalchemy import exc


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

update_sponsor = sponsor_ns.model(
    "sponsor",
    {
        "sponsor_id": fields.String(required=True),
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

get_by_id = sponsor_ns.model(
    "Sponsor",
    {"sponsor_id": fields.String(required=True)},
)


class SponsersList(Resource):
    @sponsors_ns.doc("Get all the sponsers")
    def get(self):
        return (sponsors_list_schema.dump(SponsorModel.find_all()), 200)


class Sponser(Resource):
    @sponsor_ns.expect(get_by_id)
    @sponsor_ns.doc("get by id")
    def get(self):
        request_json = request.get_json()
        try:
            data = SponsorModel.get_by_id(request_json["sponsor_id"])
            if not data:
                return {"message": "sponsor data not found"}, 400
            return (sponsor_schema.dump(data), 200)
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data"}, 500

    @sponsor_ns.expect(sponsor)
    @sponsor_ns.doc("Create a sponser")
    def post(self):
        sponsor_json = request.get_json()
        try:
            sponser_data = sponsor_schema.load(sponsor_json)
            sponser_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data {}".format(str(e))}, 500
        return {"data": [], "message": "created sponser data successfully"}, 201

    @sponsor_ns.expect(update_sponsor)
    @sponsor_ns.doc("Update a sponser")
    def put(self):
        sponsor_json = request.get_json()
        try:
            sponsor_data = SponsorModel.get_by_id(sponsor_json["sponser_id"])
            if not sponsor_data:
                return {"message": "sponsor data not found"}, 500
            for key, value in sponsor_json.items():
                if hasattr(sponsor_data, key) and value is not None:
                    setattr(sponsor_data, key, value)
            sponsor_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated sponser data successfully"}, 201
