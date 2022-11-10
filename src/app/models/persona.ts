export class Persona{
  _id?: string;
  cedula: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  direccion: string;
  nivelEstudios: string;
  constructor(_id: string, cedula: string, nombre: string, apellidos: string, telefono: string, correo: string, direccion: string, nivelEstudios: string) {
    this._id = _id;
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.correo = correo;
    this.direccion = direccion;
    this.nivelEstudios = nivelEstudios;
  }
}