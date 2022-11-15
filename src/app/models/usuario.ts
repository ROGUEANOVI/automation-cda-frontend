export class Usuario{
  _id?: string;
  constructor(_id: string, public nombreUsuario: string, public clave: string, public idPersona: string, public idRol: string) {
    this._id = _id;
  }
}