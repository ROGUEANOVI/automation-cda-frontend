export class Persona{
  _id?: string;
  constructor(_id: string, public cedula: string, public nombre: string, public apellidos: string, public telefono: string, public correo: string, public direccion: string, public nivelEstudios: string) {
    this._id = _id;
  }
}