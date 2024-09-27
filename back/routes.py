from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, User, Reclamacao

user_ns = Namespace('usuarios', description='Operações relacionadas aos usuários')
reclamacao_ns = Namespace('reclamacoes', description='Operações relacionadas às reclamações')

reclamacao_model = reclamacao_ns.model('Reclamacao', {
    'id': fields.Integer(readOnly=True, description='O ID da reclamação'),
    'descricao': fields.String(required=True, description='Descrição da reclamação'),
    'usuario_id': fields.Integer(required=True, description='ID do usuário relacionado')
})

user_model = user_ns.model('User', {
    'id': fields.Integer(readOnly=True, description='O ID do usuário'),
    'nome': fields.String(required=True, description='O nome do usuário'),
    'senha': fields.String(required=True, description='A senha do usuário'),
    'reclamacoes': fields.List(fields.Nested(reclamacao_model), description='Lista de reclamações do usuário')
})


# CRUD de usuários
@user_ns.route('/')
class UserList(Resource):
    @user_ns.doc('list_users')
    @user_ns.marshal_list_with(user_model)
    def get(self):
        """Lista todos os usuários com suas reclamações"""
        usuarios = User.query.all()
        return usuarios

    @user_ns.doc('create_user')
    @user_ns.expect(user_model)
    @user_ns.marshal_with(user_model, code=201)
    def post(self):
        """Cria um novo usuário"""
        data = request.get_json()
        novo_usuario = User(nome=data['nome'], senha=data['senha'])
        db.session.add(novo_usuario)
        db.session.commit()
        return novo_usuario, 201

@user_ns.route('/<int:id>')
@user_ns.response(404, 'Usuário não encontrado')
@user_ns.param('id', 'O ID do usuário')
class UserResource(Resource):
    @user_ns.doc('get_user')
    @user_ns.marshal_with(user_model)
    def get(self, id):
        """Obtém um usuário específico"""
        usuario = User.query.get_or_404(id)
        return usuario

    @user_ns.doc('update_user')
    @user_ns.expect(user_model)
    @user_ns.marshal_with(user_model)
    def put(self, id):
        """Atualiza um usuário específico"""
        usuario = User.query.get_or_404(id)
        data = request.get_json()
        if 'nome' in data:
            usuario.nome = data['nome']
        if 'senha' in data:
            usuario.senha = data['senha']
        db.session.commit()
        return usuario

    @user_ns.doc('delete_user')
    @user_ns.response(204, 'Usuário deletado com sucesso')
    def delete(self, id):
        """Deleta um usuário específico"""
        usuario = User.query.get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204
    
@user_ns.route('/<int:id>/reclamacoes')
@user_ns.response(404, 'Usuário não encontrado')
@user_ns.param('id', 'O ID do usuário')
class UserReclamacoes(Resource):
    def get(self, id):
        """Obter todas as reclamações de um usuário específico"""
        usuario = User.query.get_or_404(id)
        reclamacoes = [{"id": reclamacao.id, "descricao": reclamacao.descricao} for reclamacao in usuario.reclamacoes]
        return reclamacoes, 200


# CRUD de reclamações
@reclamacao_ns.route('/')
class ReclamacaoList(Resource):
    @reclamacao_ns.doc('list_reclamacoes')
    @reclamacao_ns.marshal_list_with(reclamacao_model)
    def get(self):
        """Lista todas as reclamações"""
        reclamacoes = Reclamacao.query.all()
        return reclamacoes

    @reclamacao_ns.doc('create_reclamacao')
    @reclamacao_ns.expect(reclamacao_model)
    @reclamacao_ns.marshal_with(reclamacao_model, code=201)
    def post(self):
        """Cria uma nova reclamação"""
        data = request.get_json()
        nova_reclamacao = Reclamacao(descricao=data['descricao'], usuario_id=data['usuario_id'])
        db.session.add(nova_reclamacao)
        db.session.commit()
        return nova_reclamacao, 201

@reclamacao_ns.route('/<int:id>')
@reclamacao_ns.response(404, 'Reclamação não encontrada')
@reclamacao_ns.param('id', 'O ID da reclamação')
class ReclamacaoResource(Resource):
    @reclamacao_ns.doc('get_reclamacao')
    @reclamacao_ns.marshal_with(reclamacao_model)
    def get(self, id):
        """Obtém uma reclamação específica"""
        reclamacao = Reclamacao.query.get_or_404(id)
        return reclamacao

    @reclamacao_ns.doc('update_reclamacao')
    @reclamacao_ns.expect(reclamacao_model)
    @reclamacao_ns.marshal_with(reclamacao_model)
    def put(self, id):
        """Atualiza uma reclamação específica"""
        reclamacao = Reclamacao.query.get_or_404(id)
        data = request.get_json()
        reclamacao.descricao = data['descricao']
        db.session.commit()
        return reclamacao

    @reclamacao_ns.doc('delete_reclamacao')
    @reclamacao_ns.response(204, 'Reclamação deletada com sucesso')
    def delete(self, id):
        """Deleta uma reclamação específica"""
        reclamacao = Reclamacao.query.get_or_404(id)
        db.session.delete(reclamacao)
        db.session.commit()
        return '', 204 