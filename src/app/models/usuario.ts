export class Usuario{

  _id?: string;
  nombreUsuario: string;
  clave: string;
  idPersona: string;
  idRol: string;

  constructor(_id: string, nombreUsuario: string, clave: string, idPersona: string, idRol: string) {
    this._id = _id;
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.idPersona = idPersona;
    this.idRol = idRol;

  }
}