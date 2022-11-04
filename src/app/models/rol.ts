export class Rol{
  _id?: string;
  tipoUsuario: string;

  constructor(_id: string, tipoUsuario: string) {
    this._id = _id;
    this.tipoUsuario = tipoUsuario;
  }
}