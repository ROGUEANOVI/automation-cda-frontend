export class Credenciales{

  _nombreUsuario: string;
  _clave: string;

  constructor(_nombreUsuario: string, _clave: string) {
    this._nombreUsuario = _nombreUsuario;
    this._clave = _clave;
  }
}