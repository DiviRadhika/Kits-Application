from flask_restx import Namespace, fields, Resource
from schemas.site_data import SiteDataSchema
from flask import request
from sqlalchemy import exc


site_data_ns = Namespace("site_data", description="site_data related operations")
sites_data_ns = Namespace("sites_data", description="sites_data related operations")

site_data_schema = SiteDataSchema()
site_datas_list_schema = SiteDataSchema(many=True)

site_data = sites_data_ns.model(
    "site_data",
    {
        "site_data_code": fields.String(required=True),
        "site_data_name": fields.String(required=True),
        "legal_site_data_name": fields.String(required=True),
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
        "mobile_telephone": fields.String(required=True),
        "email": fields.String(required=True),
        "website": fields.String(required=True),
    },
)


class SitedatasList(Resource):
    @sites_data_ns.doc("Get all the sites_data")
    def get(self):
        return {"data": [], "message": "success"}, 200


class Sitedata(Resource):
    @site_data_ns.expect(site_data)
    @site_data_ns.doc("Create a site_data")
    def post(self):
        site_data_json = request.get_json()
        try:
            site_data_data = site_data_schema.load(site_data_json)
            site_data_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    """@site_data_ns.doc("Update a site_data")
    @site_data_ns.expect(site_data)
    def put(self):
        return {"data": [], "message": "updated"}, 200"""
