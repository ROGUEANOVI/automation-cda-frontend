export class VehiculoSeguroAdicional{
  id?: string;
  constructor(_id: string,  public idVehiculo: string, public idSeguroAdicional: string){
    this.id = _id;
  }
}