export class Revision{
  _id?: string;
  constructor(_id: string, public fechaRevision: Date, public nivelAceite: string, public nivelFrenos: string, public nivelRefrigerante: string, public nivelDireccion: string, public idVehiculo: string) {
    this._id = _id;
  }
}