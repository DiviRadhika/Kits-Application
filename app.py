from flask import Flask, Blueprint
from flask_restx import Api
from flask_jwt_extended import JWTManager

from datetime import timedelta
from ma import ma
from flask_cors import CORS
import os
from db import db
import flask_excel as excel


from resources.sponsor import Sponser, SponsersList, sponsor_ns, sponsors_ns
from resources.cro import CrosList, Cro, cro_ns, cros_ns
from resources.site_data import SitedatasList, Sitedata, site_data_ns, sites_data_ns
from resources.lab_test import LabtestssList, Labtest, lab_test_ns, lab_tests_ns


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, headers="Content-Type")
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

api.add_namespace(sponsors_ns)
api.add_namespace(sponsor_ns)
api.add_namespace(cro_ns)
api.add_namespace(cros_ns)
api.add_namespace(site_data_ns)
api.add_namespace(sites_data_ns)
api.add_namespace(lab_test_ns)
api.add_namespace(lab_tests_ns)


# cors = flask_cors.CORS()
@app.before_first_request
def create_tables():
    db.init_app(app)
    ma.init_app(app)
    db.create_all()


@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response


sponsor_ns.add_resource(Sponser, "")
sponsors_ns.add_resource(SponsersList, "")
cro_ns.add_resource(Cro, "")
cros_ns.add_resource(CrosList, "")
site_data_ns.add_resource(Sitedata, "")
sites_data_ns.add_resource(SitedatasList, "")
lab_test_ns.add_resource(Labtest, "")
lab_tests_ns.add_resource(LabtestssList, "")


if __name__ == "__main__":
    excel.init_excel(app)
    app.run(port=5001, debug=True, host="0.0.0.0")
