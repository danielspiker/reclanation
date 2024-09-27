""" 
GRUPO:
Daniel Marques Nascimento
Gabriel Castro Cunha
"""

from flask import Flask
from flask_restx import Api
from models import db
from routes import user_ns, reclamacao_ns
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:$enhaF0rte@localhost/entrega1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

api = Api(app, version='1.0', title='API Reclamações',
          description='API para gerenciamento de reclamações e usuários',
          doc='/docs')

api.add_namespace(user_ns, path='/usuarios')
api.add_namespace(reclamacao_ns, path='/reclamacoes')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
