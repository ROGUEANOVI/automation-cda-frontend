export class Vehiculo {
  _id?: string;
  constructor(_id: string, public placa: string, public marca: string, public modelo: string, public numeroPasajeros: number, public cilindrajeMotor: string, public estadoSoat: string){
    this._id = _id;
  }
}