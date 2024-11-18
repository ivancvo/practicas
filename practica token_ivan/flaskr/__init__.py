from flask import Flask

def create_app(config_name):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '12345ivan'
    app.config['JWT_SECRET_KEY'] = '12345ivanbedoya'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tutorial_canciones.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['FLASK_RUN_PORT'] = 5001
    return app
