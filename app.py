from flask import Flask, Blueprint, jsonify
from flask_restx import Api
from flask_jwt_extended import JWTManager

from datetime import timedelta
from ma import ma
from flask_cors import CORS
import os
from db import db
import flask_excel as excel
#from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy




from resources.sponsor import (
    Sponser,
    SponsersList,
    sponsor_ns,
    sponsors_ns,
    SponserActionsById,
)
from resources.cro import CrosList, Cro, cro_ns, cros_ns, CroActionsById
from resources.site_data import (
    SitedatasList,
    Sitedata,
    site_data_ns,
    sites_data_ns,
    SiteActionsById,
)
from resources.lab_test import (
    LabtestssList,
    Labtest,
    lab_test_ns,
    lab_tests_ns,
    LabActionsById,
)

from resources.meterial import (
    meterial_ns,
    meterials_ns,
    Meterial,
    MeterialsList,
    MeterialActionsById,
)
from resources.cro_protocol import (
    CroProtocol,
    CrosProtocolsList,
    cro_protocol_ns,
    cro_protocols_ns,
    CroProtocolActionsById,
)
from resources.users import (
    login_ns,
    UserLogin,
    SendOTP,
    TokenRefresh,
    CreateDefaultUser,
    user_ns,
    UserRegister,
    UserList,
    users_ns,
)
from models.users import UserModel
from resources.clab_kit_preparation import (
    clab_kit_preparation_ns,
    clab_kit_preparations_ns,
    ClabKitPreparation,
    ClabKitPreparationList,
    ClabKitProtocolActionsById,
)
from resources.sample_ack import(
    AckclabKitProtocolActionsById,
    AckclabKitPreparation,
    sample_ack_ns
)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
bluePrint = Blueprint("api", __name__, url_prefix="/api")
api = Api(bluePrint, doc="/doc", title="KITS APPLICATION")
app.register_blueprint(bluePrint)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}:5432/postgres".format(
    os.environ.get("DB_USERNAME"),
    os.environ.get("DB_PASSWORD"),
    os.environ.get("DB_IP"),
)


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=45)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["JWT_SECRET_KEY"] = "J@f@rU5m@9"


jwt = JWTManager(app)
#migrate_db = SQLAlchemy(app)
#migrate = Migrate(app, migrate_db)



@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(RefreshTokenModel.token_id).filter_by(token=jti).scalar()

    return token is not None


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return UserModel.find_by_id(user_id=identity)
    # return User.query.filter_by(id=identity).one_or_none()


@jwt.expired_token_loader
def expired_token_callback(jwt_headers, jwt_payload):
    return (
        jsonify({"description": "The token has expired.", "error": "token_expired"}),
        401,
    )


@jwt.invalid_token_loader
def invalid_token_callback(
    error,
):  # we have to keep the argument here, since it's passed in by the caller internally
    return (
        jsonify(
            {"description": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )


@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {
                "description": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )


@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_headers, jwt_payload):
    return (
        jsonify(
            {"description": "The token is not fresh.", "error": "fresh_token_required"}
        ),
        401,
    )


@jwt.revoked_token_loader
def revoked_token_callback(jwt_headers, jwt_payload):
    return (
        jsonify(
            {"description": "The token has been revoked.", "error": "token_revoked"}
        ),
        401,
    )


api.add_namespace(sponsors_ns)
api.add_namespace(sponsor_ns)
api.add_namespace(cro_ns)
api.add_namespace(cros_ns)
api.add_namespace(site_data_ns)
api.add_namespace(sites_data_ns)
api.add_namespace(lab_test_ns)
api.add_namespace(lab_tests_ns)
api.add_namespace(cro_protocol_ns)
api.add_namespace(cro_protocols_ns)
api.add_namespace(login_ns)
api.add_namespace(clab_kit_preparations_ns)
api.add_namespace(clab_kit_preparation_ns)
api.add_namespace(user_ns)
api.add_namespace(users_ns)
api.add_namespace(meterials_ns)
api.add_namespace(meterial_ns)
api.add_namespace(sample_ack_ns)



# cors = flask_cors.CORS()
@app.before_first_request
def create_tables():
    db.init_app(app)
    ma.init_app(app)
    db.create_all()
    CreateDefaultUser()


@app.after_request
def after_request(response):
    # header = response.headers
    # header["Access-Control-Allow-Origin"] = "*"
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET")
    return response


sponsor_ns.add_resource(Sponser, "")
sponsor_ns.add_resource(SponserActionsById, "/<string:sponsor_id>")
sponsors_ns.add_resource(SponsersList, "")
cro_ns.add_resource(Cro, "")
cros_ns.add_resource(CrosList, "")
site_data_ns.add_resource(Sitedata, "")
site_data_ns.add_resource(SiteActionsById, "/<string:site_id>")
sites_data_ns.add_resource(SitedatasList, "")
lab_test_ns.add_resource(Labtest, "")
lab_tests_ns.add_resource(LabtestssList, "")
lab_test_ns.add_resource(LabActionsById, "/<string:lab_test_id>")
cro_protocol_ns.add_resource(CroProtocol, "")
cro_protocols_ns.add_resource(CrosProtocolsList, "")
cro_protocol_ns.add_resource(CroProtocolActionsById, "/<string:cro_protocol_id>")
sample_ack_ns.add_resource(AckclabKitProtocolActionsById, "/<string:cro_protocol_id>/<string:site_id>")
sample_ack_ns.add_resource(AckclabKitPreparation, "")
clab_kit_preparations_ns.add_resource(ClabKitPreparationList, "")
clab_kit_preparation_ns.add_resource(ClabKitPreparation, "")
clab_kit_preparation_ns.add_resource(
    ClabKitProtocolActionsById, "/<string:cro_protocol_id>"
)
login_ns.add_resource(SendOTP, "/sendotp")
login_ns.add_resource(UserLogin, "")
login_ns.add_resource(TokenRefresh, "/refreshtoken")
user_ns.add_resource(UserRegister, "/register")
users_ns.add_resource(UserList, "/<string:user_id>")
cro_ns.add_resource(CroActionsById, "/<string:cro_id>")
meterial_ns.add_resource(Meterial, "")
meterials_ns.add_resource(MeterialsList, "")
meterial_ns.add_resource(MeterialActionsById, "/<string:meterial_id>")


if __name__ == "__main__":
    excel.init_excel(app)
    app.run(port=5001, debug=True, host="0.0.0.0")
