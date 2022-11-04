export class Usuario{

  nombreUsuario: string;
  clave: string;
  idPersona: string;
  idRol: string;

  constructor(nombreUsuario: string, clave: string, idPersona: string, idRol: string) {
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.idPersona = idPersona;
    this.idRol = idRol;

  }
}