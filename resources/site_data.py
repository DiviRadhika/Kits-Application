from flask_restx import Namespace, fields, Resource
from schemas.site_data import SiteDataSchema
from flask import request
from sqlalchemy import exc
from models.site_data import SiteDataModel
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)

from schemas.users import UserSchema


site_data_ns = Namespace("site_data", description="site_data related operations")
sites_data_ns = Namespace("sites_data", description="sites_data related operations")

site_data_schema = SiteDataSchema()
site_datas_list_schema = SiteDataSchema(many=True)
user_schema = UserSchema()


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
        "password": fields.String(required=True),
        "username": fields.String(required=True),
        "role": fields.String(required=True),
        "status": fields.Boolean(required=True),
        "website": fields.String(required=True),
    },
)

update_site_data = sites_data_ns.model(
    "update_site_data",
    {
        "site_id": fields.String(required=True),
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
        return (site_datas_list_schema.dump(SiteDataModel.find_all()), 200)


class SiteActionsById(Resource):
    @site_data_ns.doc("get by id")
    #@jwt_required(fresh=True)
    def get(self, site_id):
        try:
            data = SiteDataModel.get_by_id(site_id)
            if not data:
                return {"message": "site data not found"}, 400
            return (site_data_schema.dump(data), 200)
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data"}, 500


class Sitedata(Resource):
    @site_data_ns.expect(site_data)
    @site_data_ns.doc("Create a site_data")
    #@jwt_required(fresh=True)
    def post(self):
        site_data_json = request.get_json()
        try:
            user_data= UserModel.find_by_email(site_data_json['email'])
            if user_data:
                return {"message": "user already registered"}, 400
            new_user_data = {
                "email": site_data_json['email'],
                "password": site_data_json['password'],
                "status": site_data_json['status'],
                "username": site_data_json["username"],
                "role": site_data_json['role']
            }
            user_table_data = user_schema.load(new_user_data)
            user_table_data.save_to_db()
            del(site_data_json['password'])
            del(site_data_json['status'])
            del(site_data_json['role'])
            del(site_data_json['username'])
            site_data_data = site_data_schema.load(site_data_json)
            site_data_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data"}, 500
        return {"data": [], "message": "success"}, 201

    @site_data_ns.expect(update_site_data)
    @site_data_ns.doc("Update a site_data")
    #@jwt_required(fresh=True)
    def put(self):
        request_json = request.get_json()
        try:
            site_data = SiteDataModel.get_by_id(request_json["site_id"])
            if not site_data:
                return {"message": "site data not found"}, 500
            for key, value in request_json.items():
                if hasattr(site_data, key) and value is not None:
                    setattr(site_data, key, value)
            site_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated site data successfully"}, 201
