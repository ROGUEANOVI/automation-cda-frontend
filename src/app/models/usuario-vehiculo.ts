export class UsuarioVehiculo{
  id?: string;
  constructor(_id: string, public idUsuario: string, public idVehiculo: string){
    this.id = _id;
  }
}