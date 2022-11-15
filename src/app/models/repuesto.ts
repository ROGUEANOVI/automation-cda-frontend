export class Repuesto{
  _id?: string
  constructor(_id: string, public descripcion: string, public cantidad: number, public precio: number){
    this._id = _id;
  }
}