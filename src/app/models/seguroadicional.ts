export class SeguroAdicional{
  _id?: string;
  constructor(_id: string, public tipo: string, public fechaVencimiento: Date){
    this._id = _id;
  }
}