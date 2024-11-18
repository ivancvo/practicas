from flask import request
from ..modelos import db, Cancion, CancionSchema, Usuario, UsuarioSchema, Album, AlbumSchema
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token

cancion_schema = CancionSchema()
Usuario_schema= UsuarioSchema()
Album_schema = AlbumSchema()



class VistaCanciones(Resource): 

    def post(self):
        nueva_cancion = Cancion(titulo=request.json['titulo'], \
                                minutos = request.json['minutos'], \
                                segundos = request.json['segundos'], \
                                interprete = request.json['interprete'])
        db.session.add(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)
    
    def get(self):
        return [cancion_schema.dump(Cancion) for Cancion in Cancion.query.all()]
    
    
    # VISTA CANCION
class VistaCancion(Resource):
    
    def get(self, id_cancion):
        return cancion_schema.dump(Cancion.query.get_or_404(id_cancion))
    
    def put(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        cancion.titulo = request.json.get("titulo", cancion.titulo)
        cancion.minutos = request.json.get("minutos", cancion.minutos)
        cancion.segundos = request.json.get("segundos", cancion.segundos)
        cancion.interprete = request.json.get("interprete", cancion.interprete)
        db.session.commit()
        return cancion_schema.dump(cancion)
    
    
    def delete(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        db.session.delete(cancion)
        db.session.commit()
        return '', 204
    

# vista login 

class VistaLogin(Resource):
    def post(self):
        u_nombre = request.json["nombre"]
        u_contrasena = request.json["contrasena"]
        usuario = Usuario.query.filter_by(nombre=u_nombre).first()
        if usuario and usuario.verificar_contrasena(u_contrasena):
            return{'mensaje': 'Inicio de sesion exitoso'}, 200
        else:
            return{'mensaje': 'Nombre de usuario o contraseña incorrectos'}, 401
        

class VistaSignIn(Resource):
    def get(self, id_usuario):
        return Usuario_schema.dump(Usuario.query.get_or_404(id_usuario))
    
    def post(self):
        nuevo_usuario = Usuario(nombre=request.json["nombre"]) 
        nuevo_usuario.contrasena = request.json["contrasena"] # se usa el setter para encriptar
        token_de_acceso = create_access_token(identity=request.json['nombre'])
        db.session.add(nuevo_usuario)
        db.session.commit()
        return{'mensaje':'Usuario creado exitosamente', 'token_de_acceso': token_de_acceso}
    
    
    def put(self, id_usuario):
        usuario= Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena", usuario.contrasena)
        db.session.commit()
        return Usuario_schema.dump(usuario)
    
    
    def delete(self, id_usuario):
        usuario= Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return'', 204
    

class VistaAlbumsUsuario(Resource):
    @jwt_required()
    def post(self, id_usuario):
        nuevo_album = Album(titulo=request.json["titulo"], anio= request.json["anio"], descripcion=request.json["descripcion"], medio= request.json["medio"])
        usuario= Usuario.query.get_or_404(id_usuario)
        usuario.albumes.append(nuevo_album)
        
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'el usuario ya tiene un album con dicho nombre', 409
        
        return Album_schema.dump(nuevo_album)
    
    @jwt_required()
    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        return [Album_schema.dump(al) for al in usuario.albumes]
    


class VistaCancionesAlbum(Resource):
    
    def post(self, id_album):
        album=Album.query.get_or_404(id_album)
        
        if "id_cancion" in request.json.keys():
            
            nueva_cancion = Cancion.query.get(request.json["id_cancion"])
            if nueva_cancion is not None:
                album.canciones.appens(nueva_cancion)
                db.session.commit()
            
            else:
                return 'cancion erronea', 404
        else:
            nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete= request.json["interprete"])
            album.canciones.append(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)

def get(self, id_album):
    album = Album.query.get_or_404(id_album)
    return [cancion_schema.dump(ca) for ca in album.canciones]



class VistaAlbum(Resource):
    def get(self, id_album):
        return Album_schema.dump(Album.query.get_or_404(id_album))
    
    def put(self, id_album):
        album=Album.query.get_or_404(id_album)
        album.titulo = request.json.get("titulo", album.titulo)
        album.anio = request.json.get("anio", album.anio)
        album.descripcion =request.json.get("descripcion", album.descripcion)
        album.medio = request.json.get("medio",album.medio)
        db.session.commit()
        return Album_schema.dump(album)
    
    
    def delete(self, id_album):
        album = Album.query.get_or_404(id_album)
        db.session.delete(album)
        db.session.commit()
        return '', 204
        