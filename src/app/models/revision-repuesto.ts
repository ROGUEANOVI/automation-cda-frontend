export class RevisionRepuesto{
  id?: string;
  constructor(_id: string, public idRevision: string, public idRepuesto: string){
    this.id = _id;
  }
}