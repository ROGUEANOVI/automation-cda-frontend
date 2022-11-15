export class Rol{
  _id?: string;
  constructor(_id: string, public tipoUsuario: string) { 
    this._id = _id;
  }
}